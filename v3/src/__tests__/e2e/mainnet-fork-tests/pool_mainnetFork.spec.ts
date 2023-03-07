import { PolywrapClient } from "@polywrap/client-js";
import {
  Pool, TokenAmount, PoolChangeResult,
  getConfig, initInfra, stopInfra,
  getUniswapPool,
  getPoolFromAddress, getPools, buildDependencies
} from "../helpers";
import path from "path";
import * as uni from "@uniswap/v3-sdk";
import * as uniCore from "@uniswap/sdk-core";
import * as ethers from "ethers";
import poolList from "../testData/poolList.json";

jest.setTimeout(360000);

describe("Pool (mainnet fork)", () => {

  let client: PolywrapClient;
  let fsUri: string;
  const addresses: string[] = poolList;
  let pools: Pool[];
  let pool0: Pool;
  let uniPool0: uni.Pool;
  let ethersProvider: ethers.providers.BaseProvider;

  beforeAll(async () => {
    await initInfra();
    // get client
    const { sha3Uri, graphUri } = await buildDependencies();
    const config = getConfig(sha3Uri, graphUri);
    client = new PolywrapClient(config);
    // get uri
    const wrapperAbsPath: string = path.resolve(__dirname + "/../../../../");
    fsUri = "fs/" + wrapperAbsPath + '/build';
    // set up ethers provider
    ethersProvider = ethers.providers.getDefaultProvider("http://localhost:8546");
    // set up test case data
    pools = await getPools(client, fsUri);
    pool0 = await getPoolFromAddress(client, fsUri, addresses[0], true);
    uniPool0 = await getUniswapPool(ethersProvider, addresses[0], true);
  });

  afterAll(async () => {
    await stopInfra();
  });

  it("Gets pool address", async () => {
    for (let i = 0; i < pools.length; i++) {
      const invocation = await client.invoke<string>({
        uri: fsUri,
        method: "getPoolAddress",
        args: {
          tokenA: pools[i].token0,
          tokenB: pools[i].token1,
          fee: pools[i].fee,
        },
      });
      if (invocation.ok == false) fail(invocation.error);
      expect(invocation.value.toLowerCase()).toEqual(addresses[i].toLowerCase());
    }
  });

  it("getPoolOutputAmount", async () => {
    // const pool0 = (await getPools(client, fsUri, true, 0, 1))[0];
    // const uniPool0 = (await getUniPools(ethersProvider, true, 0, 1))[0];
    const inputAmount: TokenAmount = {
      token: pool0.token0,
      amount: "1000000000000000000",
    }
    const invocation = await client.invoke<PoolChangeResult>({
      uri: fsUri,
      method: "getPoolOutputAmount",
      args: {
        pool: pool0,
        inputAmount: inputAmount,
        sqrtPriceLimitX96: null,
      },
    });
    if (invocation.ok == false) fail(invocation.error);

    const uniInputAmount = uniCore.CurrencyAmount.fromRawAmount<uniCore.Token>(uniPool0.token0, inputAmount.amount);
    const [uniCurrencyAmount, uniPool] = await uniPool0.getOutputAmount(uniInputAmount);

    // output amount
    expect(invocation.value.amount.token.address).toEqual(uniCurrencyAmount.currency.address);
    expect(invocation.value.amount.amount).toEqual(uniCurrencyAmount.numerator.toString());
    // pool state
    expect(invocation.value.nextPool.sqrtRatioX96).toEqual(uniPool.sqrtRatioX96.toString());
    expect(invocation.value.nextPool.liquidity).toEqual(uniPool.liquidity.toString());
    expect(invocation.value.nextPool.tickCurrent).toEqual(uniPool.tickCurrent);
  });

  it("getPoolInputAmount", async () => {
    // const pool0 = (await getPools(client, fsUri, true, 0, 1))[0];
    // const uniPool0 = (await getUniPools(ethersProvider, true, 0, 1))[0];
    const outputAmount: TokenAmount = {
      token: pool0.token0,
      amount: "1000000000000000000",
    }
    const invocation = await client.invoke<PoolChangeResult>({
      uri: fsUri,
      method: "getPoolInputAmount",
      args: {
        pool: pool0,
        outputAmount: outputAmount,
        sqrtPriceLimitX96: null,
      },
    });
    if (invocation.ok == false) fail(invocation.error);

    const unitOutputAmount = uniCore.CurrencyAmount.fromRawAmount<uniCore.Token>(uniPool0.token0, outputAmount.amount);
    const [uniCurrencyAmount, uniPool] = await uniPool0.getInputAmount(unitOutputAmount);

    // input amount
    expect(invocation.value.amount.token.address).toEqual(uniCurrencyAmount.currency.address);
    expect(invocation.value.amount.amount).toEqual(uniCurrencyAmount.numerator.toString());
    // pool state
    expect(invocation.value.nextPool.sqrtRatioX96).toEqual(uniPool.sqrtRatioX96.toString());
    expect(invocation.value.nextPool.liquidity).toEqual(uniPool.liquidity.toString());
    expect(invocation.value.nextPool.tickCurrent).toEqual(uniPool.tickCurrent);
  });
});
