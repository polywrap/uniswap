import { PolywrapClient } from "@polywrap/client-js";
import path from "path";
import { getTokenList } from "../testUtils";
import { getBuilder, initInfra, stopInfra } from "../infraUtils";
import * as uni from "@uniswap/sdk";
import * as ethers from "ethers";
import { BaseProvider, getDefaultProvider} from "@ethersproject/providers"
import * as App from "./types/wrap";

jest.setTimeout(90000);

describe("Fetch", () => {

  let client: PolywrapClient;
  let fsUri: string;
  let tokens: App.Token[];
  let uniTokens: uni.Token[];
  let pairs: App.Token[][];
  let ethersProvider: BaseProvider;

  beforeAll(async () => {
    await initInfra();
    // get client
    client = new PolywrapClient(getBuilder().build());
    // deploy api
    const wrapperAbsPath: string = path.resolve(__dirname + "/../../..");
    fsUri = "fs/" + wrapperAbsPath + '/build';
    // set up test case data -> tokens
    tokens = await getTokenList();
    uniTokens = tokens.map(token => {
      return new uni.Token(
        uni.ChainId.MAINNET,
        token.address,
        token.currency.decimals,
        token.currency.symbol || "",
        token.currency.name || ""
      );
    });
    // set up test case data -> pairs
    const aave: App.Token = tokens.filter(token => token.currency.symbol === "AAVE")[0];
    const dai: App.Token = tokens.filter(token => token.currency.symbol === "DAI")[0];
    const usdc: App.Token = tokens.filter(token => token.currency.symbol === "USDC")[0];
    const comp: App.Token = tokens.filter(token => token.currency.symbol === "COMP")[0];
    const weth: App.Token = tokens.filter(token => token.currency.symbol === "WETH")[0];
    const wbtc: App.Token = tokens.filter(token => token.currency.symbol === "WBTC")[0];
    const uniswap: App.Token = tokens.filter(token => token.currency.symbol === "UNI")[0];
    const link: App.Token = tokens.filter(token => token.currency.symbol === "LINK")[0];
    pairs = [[aave, dai], [usdc, dai], [aave, usdc], [comp, weth], [uniswap, link], [uniswap, wbtc], [wbtc, weth]];
    // set up ethers provider
    ethersProvider = getDefaultProvider("http://127.0.0.1:8546");
  });

  afterAll(async () => {
    await stopInfra();
  });

  it("Fetches token data", async () => {
    for (let i = 0; i < 10; i++) {
      // actual token
      const result = await client.invoke<App.Token>({
        uri: fsUri,
        method: "fetchTokenData",
        args: {
          chainId: tokens[i].chainId,
          address: tokens[i].address,
        },
      });
      // compare results
      if (result.ok === false) throw result.error;
      expect(result.value.currency.symbol).toStrictEqual(tokens[i].currency.symbol);
      expect(result.value.currency.decimals).toStrictEqual(tokens[i].currency.decimals);
      // fetched name can vary from token list, e.g. "Aave" vs "Aave Token", so not testing (can verify it works with console.log)
      // expect(tokenData.value.fetchTokenData.currency.name).toStrictEqual(tokens[i].currency.name);
    }
  });

  it("Fetches pair data", async () => {
    // loop over token pairs
    for (let i = 0; i < pairs.length; i++) {
      // prepare uni tokens
      const uniTokenI: uni.Token = uniTokens.filter(token => token.address === pairs[i][0].address)[0];
      const uniTokenJ: uni.Token = uniTokens.filter(token => token.address === pairs[i][1].address)[0];
      // actual pair data
      const result = await client.invoke<App.Pair>({
        uri: fsUri,
        method: "fetchPairData",
        args: {
          token0: pairs[i][0],
          token1: pairs[i][1]
        },
      });
      // expected pair data
      const uniPair: uni.Pair = await uni.Fetcher.fetchPairData(uniTokenI, uniTokenJ, ethersProvider);
      // compare results
      if (result.ok === false) throw result.error;
      expect(result.value.tokenAmount0.amount).toStrictEqual(uniPair.reserve0.numerator.toString());
      expect(result.value.tokenAmount1.amount).toStrictEqual(uniPair.reserve1.numerator.toString());
    }
  });

  it("Fetches total supply", async () => {
    for (let i = 0; i < 10; i++) {
      // prepare contract to check results
      const abi = ["function totalSupply() external view returns (uint)"];
      const contract = new ethers.Contract(tokens[i].address, abi, ethersProvider);
      // actual totalSupply
      const result = await client.invoke<App.TokenAmount>({
        uri: fsUri,
        method: "fetchTotalSupply",
        args: {
          token: tokens[i],
        },
      });
      // expected totalSupply
      const expectedTotalSupply: string = (await contract.totalSupply()).toString();
      // compare results
      if (result.ok === false) throw result.error;
      expect(result.value.amount).toStrictEqual(expectedTotalSupply);
    }
  });

  it("Fetches kLast", async () => {
    // loop over tokens
    for (let i = 0; i < pairs.length; i++) {
      // prepare contract to check results
      const uniTokenI: uni.Token = uniTokens.filter(token => token.address === pairs[i][0].address)[0];
      const uniTokenJ: uni.Token = uniTokens.filter(token => token.address === pairs[i][1].address)[0];
      const uniPairAddress: string = uni.Pair.getAddress(uniTokenI, uniTokenJ);
      const abi = ["function kLast() external view returns (uint)"];
      const contract = new ethers.Contract(uniPairAddress, abi, ethersProvider);
      // get pair address
      const pairAddress = await client.invoke<string>({
        uri: fsUri,
        method: "pairAddress",
        args: {
          token0: pairs[i][0],
          token1: pairs[i][1]
        },
      });
      if (pairAddress.ok === false) throw pairAddress.error;
      const actualPairAddress: string = pairAddress.value;
      // create pair token using pair address
      const pairToken: App.Token = {
        chainId: App.ChainIdEnum.MAINNET,
        address: actualPairAddress,
        currency: {
          decimals: 18,
          symbol: null,
          name: null,
        },
      };
      // get actual kLast
      const result = await client.invoke<string>({
        uri: fsUri,
        method: "fetchKLast",
        args: {
          token: pairToken,
        },
      });
      // expected kLast
      const expectedKLast: string = (await contract.kLast()).toString();
      // compare results
      if (result.ok === false) throw result.error;
      expect(actualPairAddress).toStrictEqual(uniPairAddress);
      expect(result.value).toStrictEqual(expectedKLast);
    }
  });

});
