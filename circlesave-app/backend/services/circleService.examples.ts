/**
 * Example usage of circleService functions
 * This file demonstrates how to use the database operations
 */

import * as circleService from './circleService'

// ==================== EXAMPLE: CREATE CIRCLE ====================
async function exampleCreateCircle() {
  // When a circle is created on-chain, sync it to database
  const circle = await circleService.createCircle({
    onChainId: BigInt(1), // From registry.counter
    name: 'My Savings Circle',
    creatorId: 1, // User ID from your auth system
    startCycle: BigInt(Math.floor(Date.now() / 1000)), // Current timestamp
    endCycle: BigInt(Math.floor(Date.now() / 1000) + 30 * 86400), // 30 days later
    vaultCreatedAt: BigInt(Math.floor(Date.now() / 1000)), // From contract
  })

  console.log('Created circle:', circle)
  // Circle and Vault are created together with same ID
}

// ==================== EXAMPLE: RECORD DEPOSIT ====================
async function exampleRecordDeposit() {
  // When user deposits to circle on-chain, record it in database
  const result = await circleService.recordDeposit({
    circleId: 1,
    userId: 2, // User ID
    walletAddress: '0x123...', // User's Aptos wallet address
    amount: BigInt(1000000), // Amount in smallest unit (octas)
  })

  console.log('Deposit recorded:', result)
  // This automatically:
  // - Creates/updates contributor balance
  // - Updates vault total balance
  // - All in one transaction
}

// ==================== EXAMPLE: GET CIRCLE INFO ====================
async function exampleGetCircle() {
  // Get circle by database ID
  const circle = await circleService.getCircleById(1)

  // Or get by on-chain ID
  const circleByOnChain = await circleService.getCircleByOnChainId(BigInt(1))

  console.log('Circle:', circle)
  console.log('Includes vault, creator, and contributors')
}

// ==================== EXAMPLE: GET USER BALANCE ====================
async function exampleGetUserBalance() {
  const balance = await circleService.getUserBalanceInCircle(
    1, // circleId
    '0x123...' // walletAddress
  )

  console.log('User balance:', balance.toString())
}

// ==================== EXAMPLE: PROCESS WITHDRAWAL ====================
async function exampleProcessWithdrawal() {
  // When user requests withdrawal (USDC or Fiat)
  const withdrawal = await circleService.processWithdrawal({
    circleId: 1,
    userId: 2,
    walletAddress: '0x123...',
    amount: BigInt(500000), // Half of their balance
    withdrawalType: 1, // 1 = USDC, 2 = Fiat
  })

  console.log('Withdrawal processed:', withdrawal)
  // This automatically:
  // - Creates withdrawal record
  // - Decrements contributor balance
  // - Decrements vault total balance
  // - All in one transaction
}

// ==================== EXAMPLE: UPDATE WITHDRAWAL STATUS ====================
async function exampleUpdateWithdrawalStatus() {
  // After processing USDC withdrawal on-chain
  await circleService.updateWithdrawalStatus(1, 'completed', {
    transactionHash: '0xabc123...',
    completedAt: new Date(),
  })

  // After processing Fiat withdrawal via Monnify
  await circleService.updateWithdrawalStatus(2, 'completed', {
    monnifyReference: 'MONNIFY_REF_123',
    completedAt: new Date(),
  })
}

// ==================== EXAMPLE: GET ALL CIRCLES ====================
async function exampleGetAllCircles() {
  // Get all active circles
  const activeCircles = await circleService.getCircles({
    status: 0, // Active
    limit: 10,
    offset: 0,
  })

  // Get circles created by a user
  const userCircles = await circleService.getCircles({
    creatorId: 1,
  })

  console.log('Active circles:', activeCircles)
  console.log('User circles:', userCircles)
}

// ==================== EXAMPLE: UPDATE CIRCLE STATUS ====================
async function exampleUpdateCircleStatus() {
  // When cycle ends, update status
  await circleService.updateCircleStatus(1, 1) // 1 = Ended

  // When circle is closed
  await circleService.updateCircleStatus(1, 2) // 2 = Closed
}

// ==================== EXAMPLE: GET WITHDRAWALS ====================
async function exampleGetWithdrawals() {
  // Get pending withdrawals for a circle
  const pending = await circleService.getWithdrawals({
    circleId: 1,
    status: 'pending',
  })

  // Get all USDC withdrawals
  const usdcWithdrawals = await circleService.getWithdrawals({
    withdrawalType: 1, // USDC
    status: 'pending',
  })

  console.log('Pending withdrawals:', pending)
  console.log('USDC withdrawals:', usdcWithdrawals)
}

// ==================== EXAMPLE: GET CIRCLE CONTRIBUTORS ====================
async function exampleGetContributors() {
  const contributors = await circleService.getCircleContributors(1)

  console.log('Contributors:', contributors)
  // Returns all contributors sorted by balance (descending)
}

