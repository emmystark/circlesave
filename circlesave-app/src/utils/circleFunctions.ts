// frontend/src/utils/circle-contracts.ts
import { Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk';

const MODULE_ADDRESS = (import.meta.env.VITE_MODULE_ADDRESS as string) || '';

// Initialize Aptos client
const config = new AptosConfig({
  network: Network.CUSTOM,
  fullnode: 'https://testnet.bardock.movementnetwork.xyz/v1',
});

const aptos = new Aptos(config);

// Types
export interface CircleInfo {
  name: string;
  creator: string;
  startCycle: number;
  endCycle: number;
  totalBalance: number;
  status: number;
}

// 1. Create Circle (User signs)
export const createCircle = async (
  signAndSubmitTransaction: any,
  circleName: string,
  endCycleDays: number,
  sender: string
): Promise<{ hash: string; circleId?: number }> => {
  try {
    const response = await signAndSubmitTransaction({
      sender,
      data: {
        function: `${MODULE_ADDRESS}::main::create_circle`,
        typeArguments: [],
        functionArguments: [circleName, endCycleDays],
      },
    });

    await aptos.waitForTransaction({ transactionHash: response.hash });

    let circleId: number | undefined;
    try {
      const tx = await aptos.getTransactionByHash({ transactionHash: response.hash });
      const events = (tx as any)?.events || [];
      const created = events.find(
        (e: any) =>
          typeof e?.type === 'string' &&
          e.type.toLowerCase().includes('::circlecreated')
      );
      const rawId = created?.data?.circle_id ?? created?.data?.circleId;
      if (rawId !== undefined) {
        circleId = Number(rawId);
      }
    } catch {
      // best-effort; leave circleId undefined
    }

    return { hash: response.hash, circleId };
  } catch (error) {
    console.error('Create circle failed:', error);
    throw error;
  }
};

// 2. Deposit to Circle (User signs)
export const depositToCircle = async (
  signAndSubmitTransaction: any,
  circleId: number,
  amount: number
): Promise<string> => {
  try {
    const response = await signAndSubmitTransaction({
      data: {
        function: `${MODULE_ADDRESS}::main::deposit_to_circle`,
        functionArguments: [circleId, amount],
      },
    });

    await aptos.waitForTransaction({ transactionHash: response.hash });
    return response.hash;
  } catch (error) {
    console.error('Deposit failed:', error);
    throw error;
  }
};

// 3. Withdraw as USDC (User signs)
export const withdrawAsUSDC = async (
  signAndSubmitTransaction: any,
  circleId: number,
  amount: number
): Promise<string> => {
  try {
    const response = await signAndSubmitTransaction({
      data: {
        function: `${MODULE_ADDRESS}::main::withdraw_as_usdc`,
        functionArguments: [circleId, amount],
      },
    });

    await aptos.waitForTransaction({ transactionHash: response.hash });
    return response.hash;
  } catch (error) {
    console.error('USDC withdrawal failed:', error);
    throw error;
  }
};

// 4. View Functions (No signing needed)
export const getCircleInfo = async (circleId: number): Promise<CircleInfo> => {
  try {
    const result = await aptos.view({
      payload: {
        function: `${MODULE_ADDRESS}::main::get_circle_info`,
        functionArguments: [circleId],
      },
    });

    return {
      name: result[0] as string,
      creator: result[1] as string,
      startCycle: Number(result[2]),
      endCycle: Number(result[3]),
      totalBalance: Number(result[4]),
      status: Number(result[5]),
    };
  } catch (error) {
    console.error('Failed to get circle info:', error);
    throw error;
  }
};

export const getUserBalance = async (
  circleId: number,
  userAddress: string
): Promise<number> => {
  try {
    const result = await aptos.view({
      payload: {
        function: `${MODULE_ADDRESS}::main::get_user_balance`,
        functionArguments: [circleId, userAddress],
      },
    });

    return Number(result[0]);
  } catch (error) {
    console.error('Failed to get user balance:', error);
    return 0;
  }
};