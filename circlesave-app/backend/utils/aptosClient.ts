import { Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk'

const MODULE_ADDRESS = process.env.MODULE_ADDRESS || ''

// Initialize Aptos client for backend
const config = new AptosConfig({
  network: Network.CUSTOM,
  fullnode: 'https://testnet.bardock.movementnetwork.xyz/v1',
})

export const aptos = new Aptos(config)

export interface CircleInfo {
  name: string
  creator: string
  startCycle: bigint
  endCycle: bigint
  totalBalance: bigint
  status: number
}

/**
 * Get circle info from smart contract (view function)
 */
export async function getCircleInfoFromChain(circleId: bigint): Promise<CircleInfo> {
  try {
    const result = await aptos.view({
      payload: {
        function: `${MODULE_ADDRESS}::main::get_circle_info`,
        functionArguments: [circleId.toString()],
      },
    })

    return {
      name: result[0] as string,
      creator: result[1] as string,
      startCycle: BigInt(result[2] as string),
      endCycle: BigInt(result[3] as string),
      totalBalance: BigInt(result[4] as string),
      status: Number(result[5]),
    }
  } catch (error) {
    console.error('Failed to get circle info from chain:', error)
    throw error
  }
}

/**
 * Get user balance from smart contract (view function)
 */
export async function getUserBalanceFromChain(
  circleId: bigint,
  userAddress: string
): Promise<bigint> {
  try {
    const result = await aptos.view({
      payload: {
        function: `${MODULE_ADDRESS}::main::get_user_balance`,
        functionArguments: [circleId.toString(), userAddress],
      },
    })

    return BigInt(result[0] as string)
  } catch (error) {
    console.error('Failed to get user balance from chain:', error)
    return BigInt(0)
  }
}

export { MODULE_ADDRESS }

