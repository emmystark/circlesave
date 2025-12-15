import express from 'express'
import authMiddleware from '../middleware/authMiddleware'
import prisma from '../prismaClient'
import * as circleService from '../services/circleService'
import { getCircleInfoFromChain, getUserBalanceFromChain } from '../utils/aptosClient'

const router = express.Router()

// All routes require authentication
router.use(authMiddleware)

/**
 * POST /circles
 * Create a circle - accepts name and duration from creator
 * Frontend calls this after successfully creating circle on-chain
 * 
 * Flow:
 * 1. User inputs: name, durationDays
 * 2. Frontend calls smart contract with name and durationDays
 * 3. Smart contract creates circle and returns onChainId
 * 4. Frontend calls this endpoint to sync to database
 */
router.post('/', async (req, res) => {
  try {
    const userId = req.userId
    const { onChainId, name, durationDays, transactionHash } = req.body

    if (!onChainId || !name || !durationDays) {
      return res.status(400).json({ 
        message: 'Missing required fields: onChainId, name, and durationDays are required' 
      })
    }

    if (typeof durationDays !== 'number' || durationDays <= 0) {
      return res.status(400).json({ message: 'durationDays must be a positive number' })
    }

    // Verify circle exists on-chain and get actual data
    const chainInfo = await getCircleInfoFromChain(BigInt(onChainId))
    
    // Verify the name matches (safety check)
    if (chainInfo.name !== name) {
      console.warn(`Circle name mismatch: chain="${chainInfo.name}", provided="${name}"`)
      // Use chain name as source of truth
    }

    // Calculate timestamps from chain data (source of truth)
    const startCycle = chainInfo.startCycle
    const endCycle = chainInfo.endCycle
    const vaultCreatedAt = startCycle // Vault created when circle starts

    // Create circle in database
    const circle = await circleService.createCircle({
      onChainId: BigInt(onChainId),
      name: chainInfo.name, // Use chain name as source of truth
      creatorId: userId,
      startCycle,
      endCycle,
      vaultCreatedAt,
    })

    return res.status(201).json({
      message: 'Circle created successfully',
      circle: {
        id: circle.id,
        onChainId: circle.onChainId?.toString(),
        name: circle.name,
        startCycle: circle.startCycle.toString(),
        endCycle: circle.endCycle.toString(),
        status: circle.status,
        totalBalance: circle.vault?.totalBalance.toString() || '0',
        durationDays: Number(durationDays),
      },
    })
  } catch (error: any) {
    console.error('Create circle error:', error)
    if (error.code === 'P2002') {
      return res.status(400).json({ message: 'Circle already exists in database' })
    }
    if (error.message?.includes('Failed to get circle info from chain')) {
      return res.status(400).json({ message: 'Circle not found on-chain. Verify onChainId is correct.' })
    }
    return res.status(500).json({ message: 'Failed to create circle' })
  }
})

/**
 * GET /circles
 * Get user's circles (both active and past)
 * Query params: ?status=0 (active), ?status=2 (past/history)
 */
router.get('/', async (req, res) => {
  try {
    const userId = req.userId
    const status = req.query.status ? parseInt(req.query.status as string) : undefined

    let circles

    if (status !== undefined) {
      // Get circles with specific status
      circles = await circleService.getCircles({
        status,
      })
    } else {
      // Get all circles user is part of (as creator or contributor)
      const [createdCircles, contributedCircles] = await Promise.all([
        circleService.getCircles({ creatorId: userId }),
        prisma.circle.findMany({
          where: {
            contributors: {
              some: {
                userId,
              },
            },
          },
          include: {
            creator: {
              select: {
                id: true,
                username: true,
                name: true,
                walletAddress: true,
              },
            },
            vault: true,
            _count: {
              select: {
                contributors: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        }),
      ])

      // Merge and deduplicate
      const circleMap = new Map()
      createdCircles.forEach((c) => circleMap.set(c.id, c))
      contributedCircles.forEach((c) => circleMap.set(c.id, c))
      circles = Array.from(circleMap.values())
    }

    // Format response - hide individual contribution amounts for privacy
    const formattedCircles = circles.map((circle) => ({
      id: circle.id,
      onChainId: circle.onChainId?.toString(),
      name: circle.name,
      creator: {
        id: circle.creator.id,
        username: circle.creator.username,
        name: circle.creator.name,
        // Don't expose wallet address to others
        walletAddress: circle.creator.id === userId ? circle.creator.walletAddress : undefined,
      },
      startCycle: circle.startCycle.toString(),
      endCycle: circle.endCycle.toString(),
      status: circle.status,
      totalBalance: circle.vault?.totalBalance.toString() || '0',
      contributorCount: circle._count?.contributors || circle.contributors?.length || 0,
      isCreator: circle.creator.id === userId,
      createdAt: circle.createdAt,
    }))

    return res.json({ circles: formattedCircles })
  } catch (error: any) {
    console.error('Get circles error:', error)
    return res.status(500).json({ message: 'Failed to get circles' })
  }
})

/**
 * GET /circles/history
 * Get user's past circles (status = 2, closed/history)
 */
router.get('/history', async (req, res) => {
  try {
    const userId = req.userId

    const [createdCircles, contributedCircles] = await Promise.all([
      circleService.getCircles({ creatorId: userId, status: 2 }),
      prisma.circle.findMany({
        where: {
          status: 2, // Closed/History
          contributors: {
            some: {
              userId,
            },
          },
        },
        include: {
          creator: {
            select: {
              id: true,
              username: true,
              name: true,
              walletAddress: true,
            },
          },
          vault: true,
          _count: {
            select: {
              contributors: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
    ])

    const circleMap = new Map()
    createdCircles.forEach((c) => circleMap.set(c.id, c))
    contributedCircles.forEach((c) => circleMap.set(c.id, c))
    const circles = Array.from(circleMap.values())

    const formattedCircles = circles.map((circle) => ({
      id: circle.id,
      onChainId: circle.onChainId?.toString(),
      name: circle.name,
      creator: {
        id: circle.creator.id,
        username: circle.creator.username,
        name: circle.creator.name,
      },
      startCycle: circle.startCycle.toString(),
      endCycle: circle.endCycle.toString(),
      status: circle.status,
      totalBalance: circle.vault?.totalBalance.toString() || '0',
      contributorCount: circle._count?.contributors || circle.contributors?.length || 0,
      isCreator: circle.creator.id === userId,
      createdAt: circle.createdAt,
    }))

    return res.json({ circles: formattedCircles })
  } catch (error: any) {
    console.error('Get history error:', error)
    return res.status(500).json({ message: 'Failed to get history' })
  }
})

/**
 * GET /circles/:id
 * Get circle details
 * Privacy: Users can see members but NOT individual contribution amounts
 */
router.get('/:id', async (req, res) => {
  try {
    const userId = req.userId
    const circleId = parseInt(req.params.id)

    const circle = await circleService.getCircleById(circleId)

    if (!circle) {
      return res.status(404).json({ message: 'Circle not found' })
    }

    // Get user's own balance (only visible to them)
    let userBalance = BigInt(0)
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { walletAddress: true },
    })

    if (user?.walletAddress && circle.onChainId) {
      userBalance = await getUserBalanceFromChain(circle.onChainId, user.walletAddress)
    }

    // Get contributors (without showing their balances to others)
    const contributors = await circleService.getCircleContributors(circleId)

    // Format contributors - hide balances from other users
    const formattedContributors = contributors.map((contributor) => ({
      id: contributor.user.id,
      username: contributor.user.username,
      name: contributor.user.name,
      // Only show wallet address if it's the current user
      walletAddress: contributor.userId === userId ? contributor.walletAddress : undefined,
      // Only show balance if it's the current user
      balance: contributor.userId === userId ? contributor.balance.toString() : undefined,
      lastContributionAt: contributor.lastContributionAt,
      joinedAt: contributor.createdAt,
    }))

    return res.json({
      id: circle.id,
      onChainId: circle.onChainId?.toString(),
      name: circle.name,
      creator: {
        id: circle.creator.id,
        username: circle.creator.username,
        name: circle.creator.name,
        walletAddress: circle.creator.id === userId ? circle.creator.walletAddress : undefined,
      },
      startCycle: circle.startCycle.toString(),
      endCycle: circle.endCycle.toString(),
      status: circle.status,
      totalBalance: circle.vault?.totalBalance.toString() || '0',
      contributors: formattedContributors,
      contributorCount: contributors.length,
      isCreator: circle.creator.id === userId,
      userBalance: userBalance.toString(), // User's own balance
      createdAt: circle.createdAt,
    })
  } catch (error: any) {
    console.error('Get circle error:', error)
    return res.status(500).json({ message: 'Failed to get circle' })
  }
})

/**
 * POST /circles/:id/join
 * Sync a deposit made on-chain to the database
 * Frontend calls this after successfully depositing on-chain
 */
router.post('/:id/join', async (req, res) => {
  try {
    const userId = req.userId
    const circleId = parseInt(req.params.id)
    const { walletAddress, amount, transactionHash } = req.body

    if (!walletAddress || !amount) {
      return res.status(400).json({ message: 'Missing wallet address or amount' })
    }

    // Verify user owns this wallet address
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { walletAddress: true },
    })

    if (user?.walletAddress !== walletAddress) {
      // Update user's wallet address if not set
      if (!user?.walletAddress) {
        await prisma.user.update({
          where: { id: userId },
          data: { walletAddress },
        })
      } else {
        return res.status(403).json({ message: 'Wallet address does not match your account' })
      }
    }

    // Verify circle exists
    const circle = await circleService.getCircleById(circleId)
    if (!circle) {
      return res.status(404).json({ message: 'Circle not found' })
    }

    // Verify deposit on-chain
    if (circle.onChainId) {
      const chainBalance = await getUserBalanceFromChain(circle.onChainId, walletAddress)
      if (chainBalance === BigInt(0)) {
        return res.status(400).json({ message: 'No balance found on-chain for this wallet' })
      }
    }

    // Record deposit in database
    const result = await circleService.recordDeposit({
      circleId,
      userId,
      walletAddress,
      amount: BigInt(amount),
    })

    return res.json({
      message: 'Successfully joined circle',
      contributor: {
        balance: result.contributor.balance.toString(),
        lastContributionAt: result.contributor.lastContributionAt,
      },
      vault: {
        totalBalance: result.vault.totalBalance.toString(),
      },
    })
  } catch (error: any) {
    console.error('Join circle error:', error)
    return res.status(500).json({ message: 'Failed to join circle' })
  }
})

/**
 * POST /circles/:id/withdraw
 * Process withdrawal from circle
 * Frontend calls this after successfully withdrawing on-chain
 */
router.post('/:id/withdraw', async (req, res) => {
  try {
    const userId = req.userId
    const circleId = parseInt(req.params.id)
    const { walletAddress, amount, transactionHash } = req.body

    if (!walletAddress || !amount) {
      return res.status(400).json({ message: 'Missing wallet address or amount' })
    }

    // Verify user owns this wallet address
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { walletAddress: true },
    })

    if (user?.walletAddress !== walletAddress) {
      return res.status(403).json({ message: 'Wallet address does not match your account' })
    }

    // Verify circle exists
    const circle = await circleService.getCircleById(circleId)
    if (!circle) {
      return res.status(404).json({ message: 'Circle not found' })
    }

    // Check if cycle has ended
    const currentTime = BigInt(Math.floor(Date.now() / 1000))
    if (circle.endCycle > currentTime) {
      return res.status(400).json({ message: 'Circle cycle has not ended yet' })
    }

    // Get user's balance
    const contributor = await circleService.getContributor(circleId, walletAddress)
    if (!contributor || contributor.balance < BigInt(amount)) {
      return res.status(400).json({ message: 'Insufficient balance' })
    }

    // Process withdrawal (updates balances and marks circle as closed)
    const withdrawal = await circleService.processWithdrawal({
      circleId,
      userId,
      walletAddress,
      amount: BigInt(amount),
    })

    // Update withdrawal with transaction hash if provided
    if (transactionHash) {
      await circleService.updateWithdrawalStatus(withdrawal.id, 'completed', {
        transactionHash,
        completedAt: new Date(),
      })
    }

    return res.json({
      message: 'Withdrawal processed successfully',
      withdrawal: {
        id: withdrawal.id,
        amount: withdrawal.amount.toString(),
        status: transactionHash ? 'completed' : 'pending',
        transactionHash: transactionHash || null,
      },
      circle: {
        id: circle.id,
        status: 2, // Now closed/history
      },
    })
  } catch (error: any) {
    console.error('Withdraw error:', error)
    return res.status(500).json({ message: 'Failed to process withdrawal' })
  }
})

export default router

