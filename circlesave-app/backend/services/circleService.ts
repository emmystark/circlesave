import prisma from '../prismaClient'
import { Prisma } from '@prisma/client'

// ==================== CIRCLE OPERATIONS ====================

/**
 * Create a new circle with its vault
 * The vault will have the same ID as the circle (matching onChainId)
 */
export async function createCircle(data: {
  onChainId: bigint
  name: string
  creatorId: number
  startCycle: bigint
  endCycle: bigint
  vaultCreatedAt: bigint // Timestamp from contract
}) {
  return await prisma.$transaction(async (tx) => {
    // Create circle
    const circle = await tx.circle.create({
      data: {
        onChainId: data.onChainId,
        name: data.name,
        creatorId: data.creatorId,
        startCycle: data.startCycle,
        endCycle: data.endCycle,
        status: 0, // Active
        vault: {
          create: {
            createdAt: data.vaultCreatedAt,
            totalBalance: BigInt(0),
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
      },
    })

    return circle
  })
}

/**
 * Get circle by ID
 */
export async function getCircleById(circleId: number) {
  return await prisma.circle.findUnique({
    where: { id: circleId },
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
      contributors: {
        include: {
          user: {
            select: {
              id: true,
              username: true,
              name: true,
              walletAddress: true,
            },
          },
        },
      },
    },
  })
}

/**
 * Get circle by on-chain ID
 */
export async function getCircleByOnChainId(onChainId: bigint) {
  return await prisma.circle.findUnique({
    where: { onChainId },
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
      contributors: {
        include: {
          user: {
            select: {
              id: true,
              username: true,
              name: true,
              walletAddress: true,
            },
          },
        },
      },
    },
  })
}

/**
 * Get all circles with optional filters
 */
export async function getCircles(filters?: {
  creatorId?: number
  status?: number
  limit?: number
  offset?: number
}) {
  const where: Prisma.CircleWhereInput = {}
  
  if (filters?.creatorId) {
    where.creatorId = filters.creatorId
  }
  
  if (filters?.status !== undefined) {
    where.status = filters.status
  }

  return await prisma.circle.findMany({
    where,
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
    take: filters?.limit,
    skip: filters?.offset,
  })
}

/**
 * Update circle
 */
export async function updateCircle(
  circleId: number,
  data: {
    name?: string
    startCycle?: bigint
    endCycle?: bigint
    status?: number
  }
) {
  return await prisma.circle.update({
    where: { id: circleId },
    data,
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
    },
  })
}

/**
 * Update circle status
 */
export async function updateCircleStatus(circleId: number, status: number) {
  return await prisma.circle.update({
    where: { id: circleId },
    data: { status },
  })
}

/**
 * Delete circle (cascades to vault, contributors, withdrawals)
 */
export async function deleteCircle(circleId: number) {
  return await prisma.circle.delete({
    where: { id: circleId },
  })
}

// ==================== VAULT OPERATIONS ====================

/**
 * Get vault by circle ID
 */
export async function getVaultByCircleId(circleId: number) {
  return await prisma.vault.findUnique({
    where: { circleId },
    include: {
      circle: {
        include: {
          creator: {
            select: {
              id: true,
              username: true,
              name: true,
              walletAddress: true,
            },
          },
        },
      },
    },
  })
}

/**
 * Update vault total balance
 */
export async function updateVaultBalance(
  circleId: number,
  totalBalance: bigint
) {
  return await prisma.vault.update({
    where: { circleId },
    data: { totalBalance },
    include: {
      circle: true,
    },
  })
}

/**
 * Increment vault balance (for deposits)
 */
export async function incrementVaultBalance(
  circleId: number,
  amount: bigint
) {
  return await prisma.vault.update({
    where: { circleId },
    data: {
      totalBalance: {
        increment: amount,
      },
    },
    include: {
      circle: true,
    },
  })
}

/**
 * Decrement vault balance (for withdrawals)
 */
export async function decrementVaultBalance(
  circleId: number,
  amount: bigint
) {
  return await prisma.vault.update({
    where: { circleId },
    data: {
      totalBalance: {
        decrement: amount,
      },
    },
    include: {
      circle: true,
    },
  })
}

// ==================== CONTRIBUTOR OPERATIONS ====================

/**
 * Add or update contributor balance
 * Creates contributor if doesn't exist, updates if exists
 */
export async function upsertContributor(data: {
  circleId: number
  userId: number
  walletAddress: string
  balance: bigint
  lastContributionAt?: Date
}) {
  const updateData: any = {
    balance: data.balance,
  }
  
  if (data.lastContributionAt) {
    updateData.lastContributionAt = data.lastContributionAt
  }

  return await prisma.circleContributor.upsert({
    where: {
      circleId_walletAddress: {
        circleId: data.circleId,
        walletAddress: data.walletAddress,
      },
    },
    update: updateData,
    create: {
      circleId: data.circleId,
      userId: data.userId,
      walletAddress: data.walletAddress,
      balance: data.balance,
      lastContributionAt: data.lastContributionAt || new Date(),
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          name: true,
          walletAddress: true,
        },
      },
      circle: {
        include: {
          vault: true,
        },
      },
    },
  })
}

/**
 * Increment contributor balance (for deposits)
 */
export async function incrementContributorBalance(
  circleId: number,
  walletAddress: string,
  amount: bigint
) {
  // First, get the contributor to find userId
  const contributor = await prisma.circleContributor.findUnique({
    where: {
      circleId_walletAddress: {
        circleId,
        walletAddress,
      },
    },
  })

  if (!contributor) {
    throw new Error('Contributor not found. Use upsertContributor instead.')
  }

  return await prisma.circleContributor.update({
    where: {
      circleId_walletAddress: {
        circleId,
        walletAddress,
      },
    },
    data: {
      balance: {
        increment: amount,
      },
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          name: true,
          walletAddress: true,
        },
      },
    },
  })
}

/**
 * Decrement contributor balance (for withdrawals)
 */
export async function decrementContributorBalance(
  circleId: number,
  walletAddress: string,
  amount: bigint
) {
  return await prisma.circleContributor.update({
    where: {
      circleId_walletAddress: {
        circleId,
        walletAddress,
      },
    },
    data: {
      balance: {
        decrement: amount,
      },
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          name: true,
          walletAddress: true,
        },
      },
    },
  })
}

/**
 * Get contributor by circle and wallet address
 */
export async function getContributor(
  circleId: number,
  walletAddress: string
) {
  return await prisma.circleContributor.findUnique({
    where: {
      circleId_walletAddress: {
        circleId,
        walletAddress,
      },
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          name: true,
          walletAddress: true,
        },
      },
      circle: {
        include: {
          vault: true,
        },
      },
    },
  })
}

/**
 * Get all contributors for a circle
 */
export async function getCircleContributors(circleId: number) {
  return await prisma.circleContributor.findMany({
    where: { circleId },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          name: true,
          walletAddress: true,
        },
      },
    },
    orderBy: {
      balance: 'desc',
    },
  })
}

/**
 * Get user's balance in a circle
 */
export async function getUserBalanceInCircle(
  circleId: number,
  walletAddress: string
): Promise<bigint> {
  const contributor = await prisma.circleContributor.findUnique({
    where: {
      circleId_walletAddress: {
        circleId,
        walletAddress,
      },
    },
    select: {
      balance: true,
    },
  })

  return contributor?.balance || BigInt(0)
}

/**
 * Delete contributor
 */
export async function deleteContributor(
  circleId: number,
  walletAddress: string
) {
  return await prisma.circleContributor.delete({
    where: {
      circleId_walletAddress: {
        circleId,
        walletAddress,
      },
    },
  })
}

// ==================== WITHDRAWAL OPERATIONS ====================

/**
 * Create withdrawal request
 */
export async function createWithdrawal(data: {
  circleId: number
  userId: number
  walletAddress: string
  amount: bigint
}) {
  return await prisma.withdrawal.create({
    data: {
      circleId: data.circleId,
      userId: data.userId,
      walletAddress: data.walletAddress,
      amount: data.amount,
      status: 'pending',
    },
    include: {
      circle: {
        include: {
          vault: true,
        },
      },
      user: {
        select: {
          id: true,
          username: true,
          name: true,
          walletAddress: true,
        },
      },
    },
  })
}

/**
 * Get withdrawal by ID
 */
export async function getWithdrawalById(withdrawalId: number) {
  return await prisma.withdrawal.findUnique({
    where: { id: withdrawalId },
    include: {
      circle: {
        include: {
          vault: true,
        },
      },
      user: {
        select: {
          id: true,
          username: true,
          name: true,
          walletAddress: true,
        },
      },
    },
  })
}

/**
 * Get withdrawals with filters
 */
export async function getWithdrawals(filters?: {
  circleId?: number
  userId?: number
  status?: string
  limit?: number
  offset?: number
}) {
  const where: Prisma.WithdrawalWhereInput = {}

  if (filters?.circleId) {
    where.circleId = filters.circleId
  }

  if (filters?.userId) {
    where.userId = filters.userId
  }

  if (filters?.status) {
    where.status = filters.status
  }

  return await prisma.withdrawal.findMany({
    where,
    include: {
      circle: {
        include: {
          vault: true,
        },
      },
      user: {
        select: {
          id: true,
          username: true,
          name: true,
          walletAddress: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: filters?.limit,
    skip: filters?.offset,
  })
}

/**
 * Update withdrawal status
 */
export async function updateWithdrawalStatus(
  withdrawalId: number,
  status: string,
  additionalData?: {
    transactionHash?: string
    completedAt?: Date
  }
) {
  const data: Prisma.WithdrawalUpdateInput = {
    status,
  }

  if (additionalData?.transactionHash) {
    data.transactionHash = additionalData.transactionHash
  }

  if (additionalData?.completedAt || status === 'completed') {
    data.completedAt = additionalData?.completedAt || new Date()
  }

  return await prisma.withdrawal.update({
    where: { id: withdrawalId },
    data,
    include: {
      circle: {
        include: {
          vault: true,
        },
      },
      user: {
        select: {
          id: true,
          username: true,
          name: true,
          walletAddress: true,
        },
      },
    },
  })
}

/**
 * Delete withdrawal
 */
export async function deleteWithdrawal(withdrawalId: number) {
  return await prisma.withdrawal.delete({
    where: { id: withdrawalId },
  })
}

// ==================== COMPOSITE OPERATIONS ====================

/**
 * Record a deposit (updates vault and contributor in one transaction)
 */
export async function recordDeposit(data: {
  circleId: number
  userId: number
  walletAddress: string
  amount: bigint
}) {
  return await prisma.$transaction(async (tx) => {
    const now = new Date()
    
    // Check if contributor exists
    const existingContributor = await tx.circleContributor.findUnique({
      where: {
        circleId_walletAddress: {
          circleId: data.circleId,
          walletAddress: data.walletAddress,
        },
      },
    })

    let contributor
    if (existingContributor) {
      // Update existing contributor
      contributor = await tx.circleContributor.update({
        where: {
          circleId_walletAddress: {
            circleId: data.circleId,
            walletAddress: data.walletAddress,
          },
        },
        data: {
          balance: {
            increment: data.amount,
          },
          lastContributionAt: now,
        },
      })
    } else {
      // Create new contributor
      contributor = await tx.circleContributor.create({
        data: {
          circleId: data.circleId,
          userId: data.userId,
          walletAddress: data.walletAddress,
          balance: data.amount,
          lastContributionAt: now,
        },
      })
    }

    // Update vault balance
    const vault = await tx.vault.update({
      where: { circleId: data.circleId },
      data: {
        totalBalance: {
          increment: data.amount,
        },
      },
    })

    return {
      contributor,
      vault,
    }
  })
}

/**
 * Process withdrawal (creates withdrawal record and updates balances)
 * After withdrawal, circle status is set to 2 (Closed/History)
 */
export async function processWithdrawal(data: {
  circleId: number
  userId: number
  walletAddress: string
  amount: bigint
}) {
  return await prisma.$transaction(async (tx) => {
    // Create withdrawal record
    const withdrawal = await tx.withdrawal.create({
      data: {
        circleId: data.circleId,
        userId: data.userId,
        walletAddress: data.walletAddress,
        amount: data.amount,
        status: 'pending',
      },
    })

    // Update contributor balance
    await tx.circleContributor.update({
      where: {
        circleId_walletAddress: {
          circleId: data.circleId,
          walletAddress: data.walletAddress,
        },
      },
      data: {
        balance: {
          decrement: data.amount,
        },
      },
    })

    // Update vault balance
    await tx.vault.update({
      where: { circleId: data.circleId },
      data: {
        totalBalance: {
          decrement: data.amount,
        },
      },
    })

    // Mark circle as closed (moved to history)
    await tx.circle.update({
      where: { id: data.circleId },
      data: { status: 2 }, // Closed/History
    })

    return withdrawal
  })
}

