import { PolywrapClient } from "@polywrap/client-js";
import * as path from "path";
import { getPairData, getTokenList, getUniPairs } from "../testUtils";
import { getBuilder, initInfra, stopInfra } from "../infraUtils";
import * as uni from "@uniswap/sdk";
import * as App from "./types/wrap";

jest.setTimeout(480000);

describe('Route', () => {

  let client: PolywrapClient;
  let fsUri: string;
  let pairSets: App.Pair[][] = [];
  let uniPairSets: uni.Pair[][] = [];
  let inputTokens: App.Token[] = [];
  let outputTokens: App.Token[] = [];

  beforeAll(async () => {
    await initInfra();
    // get client
    client = new PolywrapClient(getBuilder().build());
    // deploy api
    const wrapperAbsPath: string = path.resolve(__dirname + "/../../..");
    fsUri = "fs/" + wrapperAbsPath + '/build';
    // pick some test case tokens
    const tokens: App.Token[] = await getTokenList();
    const aave: App.Token = tokens.filter(token => token.currency.symbol === "AAVE")[0];
    const dai: App.Token = tokens.filter(token => token.currency.symbol === "DAI")[0];
    const usdc: App.Token = tokens.filter(token => token.currency.symbol === "USDC")[0];
    const comp: App.Token = tokens.filter(token => token.currency.symbol === "COMP")[0];
    const weth: App.Token = tokens.filter(token => token.currency.symbol === "WETH")[0];
    const wbtc: App.Token = tokens.filter(token => token.currency.symbol === "WBTC")[0];
    const uniswap: App.Token = tokens.filter(token => token.currency.symbol === "UNI")[0];
    const link: App.Token = tokens.filter(token => token.currency.symbol === "LINK")[0];
    // create test case pairs
    const aave_dai: App.Pair | undefined = await getPairData(aave, dai, client, fsUri);
    const usdc_dai: App.Pair | undefined = await getPairData(usdc, dai, client, fsUri);
    const link_usdc: App.Pair | undefined = await getPairData(link, usdc, client, fsUri);
    const comp_weth: App.Pair | undefined = await getPairData(comp, weth, client, fsUri);
    const uni_link: App.Pair | undefined = await getPairData(uniswap, link, client, fsUri);
    const uni_wbtc: App.Pair | undefined = await getPairData(uniswap, wbtc, client, fsUri);
    const wbtc_weth: App.Pair | undefined = await getPairData(wbtc, weth, client, fsUri);
    // create pair sets that can form routes
    let pairSet: App.Pair[];
    // usdc <--> uni
    pairSet = [link_usdc, uni_link].map(pair => pair!);
    pairSets.push(pairSet);
    uniPairSets.push(getUniPairs(pairSet, 1));
    inputTokens.push(usdc);
    outputTokens.push(uniswap);
    // aave <--> comp
    pairSet = [aave_dai, usdc_dai, link_usdc, uni_link, uni_wbtc, wbtc_weth, comp_weth].map(pair => pair!);
    pairSets.push(pairSet);
    uniPairSets.push(getUniPairs(pairSet, 1));
    inputTokens.push(aave);
    outputTokens.push(comp);
    // comp <--> link
    pairSet = [comp_weth, wbtc_weth, uni_wbtc, uni_link].map(pair => pair!);
    pairSets.push(pairSet);
    uniPairSets.push(getUniPairs(pairSet, 1));
    inputTokens.push(comp);
    outputTokens.push(link);
  });

  afterAll(async () => {
    await stopInfra();
  })

  it('constructs a route from an array of pairs', async () => {
    for (let i = 0; i < pairSets.length; i++) {
      const pairs: App.Pair[] = pairSets[i];
      const uniPairs: uni.Pair[] = uniPairSets[i];
      const inputToken = inputTokens[i];
      const outputToken = outputTokens[i];
      // actual route
      const result = await client.invoke<App.Route>({
        uri: fsUri,
        method: "createRoute",
        args: {
          pairs,
          input: inputToken,
          output: outputToken,
        }
      });
      if (result.ok === false) throw result.error;
      // expected route
      const uniInputToken: uni.Token = new uni.Token(
        1,
        inputToken.address,
        inputToken.currency.decimals,
        inputToken.currency.symbol || "",
        inputToken.currency.name || ""
      )
      const uniOutputToken: uni.Token = new uni.Token(
        1,
        outputToken.address,
        outputToken.currency.decimals,
        outputToken.currency.symbol || "",
        outputToken.currency.name || ""
      )
      const expectedRoute = new uni.Route(uniPairs, uniInputToken, uniOutputToken);
      // compare input
      const actualRouteInput: string = result.value.input.address ?? "";
      const expectedRouteInput: string = (expectedRoute.input as uni.Token).address;
      expect(actualRouteInput).toStrictEqual(expectedRouteInput);
      // compare output
      const actualRouteOutput: string = result.value.output.address ?? "";
      const expectedRouteOutput: string = (expectedRoute.output as uni.Token).address;
      expect(actualRouteOutput).toStrictEqual(expectedRouteOutput);
      // compare path
      const actualRoutePath: string[] = result.value.path?.map(token => token.address) ?? [];
      const expectedRoutePath: string[] = expectedRoute.path.map(token => token.address);
      expect(actualRoutePath).toStrictEqual(expectedRoutePath);
    }
  });

  it('calculates route midPrice', async () => {
    for (let i = 0; i < pairSets.length; i++) {
      const pairs: App.Pair[] = pairSets[i];
      const uniPairs: uni.Pair[] = uniPairSets[i];
      const inputToken = inputTokens[i];
      const outputToken = outputTokens[i];
      // actual route
      const actualRoute = await client.invoke<App.Route>({
        uri: fsUri,
        method: "createRoute",
        args: {
          pairs,
          input: inputToken,
          output: outputToken,
        }
      });
      if (actualRoute.ok === false) throw actualRoute.error;
      // expected route
      const uniInputToken: uni.Token = new uni.Token(
        1,
        inputToken.address,
        inputToken.currency.decimals,
        inputToken.currency.symbol || "",
        inputToken.currency.name || ""
      )
      const uniOutputToken: uni.Token = new uni.Token(
        1,
        outputToken.address,
        outputToken.currency.decimals,
        outputToken.currency.symbol || "",
        outputToken.currency.name || ""
      )
      const expectedRoute = new uni.Route(uniPairs, uniInputToken, uniOutputToken);
      // actual midPrice
      const result = await client.invoke<string>({
        uri: fsUri,
        method: "routeMidPrice",
        args: {
          route: actualRoute.value,
        }
      });
      if (result.ok === false) throw result.error;
      // make sure price is correct
      const actualRouteMidPrice: string = result.value
      const expectedRouteMidPrice: string = expectedRoute.midPrice.toFixed(18);
      expect(actualRouteMidPrice).toStrictEqual(expectedRouteMidPrice);
    }
  });

});