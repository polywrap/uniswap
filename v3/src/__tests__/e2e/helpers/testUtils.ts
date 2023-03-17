import { Token, Pool, FeeAmountEnum, FeeAmount, ChainIdEnum, ChainId } from "./types";
import { PolywrapClient } from "@polywrap/client-js";
import poolList from "../testData/poolList.json";
import { getUniswapPool } from "./uniswapCreatePool";
import { ethers } from "ethers";
import * as uni from "@uniswap/v3-sdk";
import * as uniCore from "@uniswap/sdk-core";

export function getTokens(pools: Pool[]): Token[] {
  return pools
  .map<Token[]>((pool: Pool): Token[] => [pool.token0, pool.token1]) // get tokens
  .reduce((accum: Token[], current: Token[]) => accum.concat(current), []) // flatten array
  .filter((val: Token, i: number, arr: Token[]) => arr.map((t) => t.address).indexOf(val.address) === i); // remove duplicates
}

export async function getPools(client: PolywrapClient, ensUri: string, fetchTicks?: boolean, sliceStart?: number, sliceEnd?: number): Promise<Pool[]> {
  const pools: Promise<Pool>[] = poolList
    .slice(sliceStart, sliceEnd)
    .map((address: string) => getPoolFromAddress(client, ensUri, address, fetchTicks));
  return Promise.all(pools);
}

export async function getUniPools(provider: ethers.providers.BaseProvider, fetchTicks?: boolean, sliceStart?: number, sliceEnd?: number, useTicks?: uni.Tick[][]): Promise<uni.Pool[]> {
  const pools: Promise<uni.Pool>[] = poolList
    .slice(sliceStart, sliceEnd)
      .map((address: string, i: number)  => getUniswapPool(provider, address, fetchTicks, useTicks?.[i]))
  return Promise.all(pools);
}

export async function getPoolFromAddress(client: PolywrapClient, ensUri: string, address: string, fetchTicks?: boolean): Promise<Pool> {
  const poolData = await client.invoke<Pool>({
    uri: ensUri,
    method: "fetchPoolFromAddress",
    args: {
      chainId: ChainIdEnum.MAINNET,
      address: address,
      fetchTicks: fetchTicks ?? false,
    },
  });
  if (poolData.ok === false) {
    throw poolData.error;
  }
  return poolData.value;
}

export function toUniToken(token: Token): uniCore.Token {
  return new uniCore.Token(
    toUniChainId(token.chainId),
    token.address,
    token.currency.decimals,
    token.currency.symbol ?? undefined,
    token.currency.name ?? undefined
  );
}

export function toUniChainId(input: ChainId): number {
  switch (input) {
    case ChainIdEnum.MAINNET:
    case "MAINNET":
      return 1;
    case ChainIdEnum.ROPSTEN:
    case "ROPSTEN":
      return 3;
    case ChainIdEnum.RINKEBY:
    case "RINKEBY":
      return 4;
    case ChainIdEnum.GOERLI:
    case "GOERLI":
      return 5;
    case ChainIdEnum.KOVAN:
    case "KOVAN":
      return 42;
    default:
      throw new Error('Unknown chain ID. This should never happen.')
  }
}

export function getFeeAmount(feeAmount: FeeAmount): number {
  switch (feeAmount) {
    case FeeAmountEnum.LOWEST:
    case "LOWEST":
      return 100;
    case FeeAmountEnum.LOW:
    case "LOW":
      return 500;
    case FeeAmountEnum.MEDIUM:
    case "MEDIUM":
      return 3000;
    case FeeAmountEnum.HIGH:
    case "HIGH":
      return 10000;
    default:
      throw new Error("Unknown FeeAmount");
  }
}

export function isDefined<T>(t: T | undefined): t is T {
  return !!t;
}

export const getFakeTestToken = (i: number): Token => {
  return {
    chainId: ChainIdEnum.MAINNET,
    address: "0x000000000000000000000000000000000000000" + (i + 1).toString(),
    currency: {
      decimals: 18,
      symbol: "t" + i.toString(),
      name: "token" + i.toString(),
    }
  };
};