import { uniswapV3Uri } from "./uris";

export interface Example {
  name: string;
  description: string;
  uri: string;
  method: string;
  args: Record<string, unknown>;
}

export const examples: Example[] = [
  {
    name: "Get Pool Address",
    description: "Each Uniswap V3 Pool is uniquely identified by 3 characteristics: token-in, token-out, and fee.",
    uri: uniswapV3Uri,
    method: "getPoolAddress",
    args: {
      tokenA: {
        chainId: "MAINNET",
        address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        currency: {
          decimals: 18,
          symbol: "WETH",
          name: "Wrapped Ether"
        }
      },
      tokenB: {
        chainId: "MAINNET",
        address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        currency: {
          decimals: 6,
          symbol: "USDC",
          name: "USDC"
        }
      },
      fee: "MEDIUM"
    }
  },
]