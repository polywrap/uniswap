import { PolywrapClient } from "@polywrap/client-js";
import path from "path";
import {
  getBestTradeExactIn,
  getBestTradeExactOut,
  getPairData,
  getTokenList,
  getUniPairs,
  getSwapMethodAbi,
} from "../testUtils";
import { getBuilder, initInfra, stopInfra } from "../infraUtils";
import { ethers } from "ethers";
import * as uni from "@uniswap/sdk";
jest.setTimeout(120000);
import * as App from "./types/wrap";

describe("Router", () => {

  let client: PolywrapClient;
  let recipient: string;
  let fsUri: string;
  let ethersProvider: ethers.providers.JsonRpcProvider;
  let tokens: App.Token[] = [];
  let pairs: App.Pair[] = [];
  let uniPairs: uni.Pair[];
  let ethToken: App.Token;

  beforeAll(async () => {
    await initInfra();
    // get client
    client = new PolywrapClient(getBuilder().build());
    // deploy api
    const wrapperAbsPath: string = path.resolve(__dirname + "/../../..");
    fsUri = "fs/" + wrapperAbsPath + '/build';
    ethersProvider = ethers.providers.getDefaultProvider("http://localhost:8546") as ethers.providers.JsonRpcProvider;
    recipient = await ethersProvider.getSigner().getAddress();

    // set up test case data -> pairs
    const allTokens: App.Token[] = await getTokenList();
    const aave: App.Token = allTokens.filter(token => token.currency.symbol === "AAVE")[0];
    const dai: App.Token = allTokens.filter(token => token.currency.symbol === "DAI")[0];
    const usdc: App.Token = allTokens.filter(token => token.currency.symbol === "USDC")[0];
    const comp: App.Token = allTokens.filter(token => token.currency.symbol === "COMP")[0];
    const weth: App.Token = allTokens.filter(token => token.currency.symbol === "WETH")[0];
    const wbtc: App.Token = allTokens.filter(token => token.currency.symbol === "WBTC")[0];
    const uniswap: App.Token = allTokens.filter(token => token.currency.symbol === "UNI")[0];
    const link: App.Token = allTokens.filter(token => token.currency.symbol === "LINK")[0];
    ethToken = {
      chainId: App.ChainIdEnum.MAINNET,
      address: "",
      currency: {
        decimals: 18,
        name: "Ether",
        symbol: "ETH",
      },
    }
    tokens = [aave, dai, usdc, comp, weth, wbtc, uniswap, link];
    // create test case pairs
    const aave_dai: App.Pair | undefined = await getPairData(aave, dai, client, fsUri);
    const usdc_dai: App.Pair | undefined = await getPairData(usdc, dai, client, fsUri);
    const link_usdc: App.Pair | undefined = await getPairData(link, usdc, client, fsUri);
    const comp_weth: App.Pair | undefined = await getPairData(comp, weth, client, fsUri);
    const uni_link: App.Pair | undefined = await getPairData(uniswap, link, client, fsUri);
    const uni_wbtc: App.Pair | undefined = await getPairData(uniswap, wbtc, client, fsUri);
    const wbtc_weth: App.Pair | undefined = await getPairData(wbtc, weth, client, fsUri);
    [aave_dai, usdc_dai, link_usdc, uni_link, uni_wbtc, wbtc_weth, comp_weth].forEach(pair => {
      if (pair) {
        pairs.push(pair)
      }
    });

    // get uni pairs
    uniPairs = getUniPairs(pairs, 1);

    // approve token transfers
    for (let token of tokens) {
      const txResponse = await client.invoke<App.Ethereum_TxResponse>({
        uri: fsUri,
        method: 'approve',
        args: {
          token: token,
          txOverrides: {
            gasPrice: "100",
          }
        },
      });
      if (txResponse.ok === false) throw txResponse.error;
      const approvedHash: string = txResponse.value.hash;
      if (!approvedHash) {
        throw new Error("Failed to approve token: " + token.currency.symbol);
      }
    }
  });

  afterAll(async () => {
    await stopInfra();
  });

  it("successfully constructs swap call parameters with tokens in and out", async () => {
    // polywrap tokens and trades
    const token0 = tokens[0];
    const token1 = tokens[1];
    const tokenAmount: App.TokenAmount = {
        token: token0,
        amount: "100000000"
      };
    const bestTradeInArray: App.Trade[] = await getBestTradeExactIn(pairs, tokenAmount, token1, null, client, fsUri);
    const bestTradeIn: App.Trade = bestTradeInArray[0];
    const bestTradeOutArray: App.Trade[] = await getBestTradeExactOut(pairs, token1, tokenAmount, null, client, fsUri);
    const bestTradeOut: App.Trade = bestTradeOutArray[0];

    // uni tokens and trades
    const uniAmount: uni.TokenAmount = new uni.TokenAmount(new uni.Token(
      1,
      tokenAmount.token.address,
      tokenAmount.token.currency.decimals,
      tokenAmount.token.currency.symbol || "",
      tokenAmount.token.currency.name || ""
    ), tokenAmount.amount);
    const uniToken: uni.Token = new uni.Token(
      1,
      token1.address,
      token1.currency.decimals,
      token1.currency.symbol || "",
      token1.currency.name || ""
    );
    const uniBestTradeIn: uni.Trade = uni.Trade.bestTradeExactIn(uniPairs, uniAmount, uniToken)[0];
    const uniBestTradeOut: uni.Trade = uni.Trade.bestTradeExactOut(uniPairs, uniToken, uniAmount)[0];

    const testCases = [
      {bestTrade: bestTradeIn, feeRule: true},
      {bestTrade: bestTradeIn, feeRule: false},
      {bestTrade: bestTradeOut, feeRule: false}
    ];
    for (const {bestTrade, feeRule} of testCases) {
      const tradeOptions: App.TradeOptions = {
        feeOnTransfer: feeRule,
        recipient,
        allowedSlippage: "0.1",
        unixTimestamp: parseInt((new Date().getTime() / 1000).toFixed(0)),
        ttl: 1800
      }
      const uniTradeOptions: uni.TradeOptionsDeadline = {
        feeOnTransfer: feeRule,
        recipient,
        allowedSlippage: new uni.Percent(uni.JSBI.BigInt(1000), uni.JSBI.BigInt(10000)),
        deadline: parseInt((new Date().getTime() / 1000).toFixed(0)) + 1800
      }

      const swapParametersInvocation = await client.invoke<App.SwapParameters>({
        uri: fsUri,
        method: "swapCallParameters",
        args: {
          trade: bestTrade,
          tradeOptions: tradeOptions
        },
      });
      if (swapParametersInvocation.ok === false) throw swapParametersInvocation.error;
      const swapParameters: App.SwapParameters = swapParametersInvocation.value;
      const parsedArgs: (string | string[])[] = swapParameters.args.map((arg: string) =>
        arg.startsWith("[") && arg.endsWith("]") ? JSON.parse(arg) : arg
      );

      let expectedSwapParameters: uni.SwapParameters;
      if (bestTrade.tradeType === App.TradeTypeEnum.EXACT_INPUT || bestTrade.tradeType === "EXACT_INPUT") {
        expectedSwapParameters = uni.Router.swapCallParameters(uniBestTradeIn, uniTradeOptions);
      } else {
        expectedSwapParameters = uni.Router.swapCallParameters(uniBestTradeOut, uniTradeOptions);
      }

      expect(parsedArgs).toStrictEqual(expectedSwapParameters.args);
      expect(swapParameters.methodName).toStrictEqual(expectedSwapParameters.methodName);
      expect(swapParameters.value).toStrictEqual(expectedSwapParameters.value);
    }
  });

  it("successfully constructs swap call parameters with exact eth in/out", async () => {
    // tokens and trades
    const token0 = ethToken;
    const token1 = tokens.filter(token => token.currency.symbol === "WBTC")[0];
    const tokenAmount: App.TokenAmount = {
      token: token0,
      amount: "1000000000000000000"
    };
    const bestTradeInArray: App.Trade[] = await getBestTradeExactIn(pairs, tokenAmount, token1, null, client, fsUri);
    const bestTradeIn: App.Trade = bestTradeInArray[0];
    const bestTradeOutArray: App.Trade[] = await getBestTradeExactOut(pairs, token1, tokenAmount, null, client, fsUri);
    const bestTradeOut: App.Trade = bestTradeOutArray[0];

    // uni tokens and trades
    const uniAmount: uni.CurrencyAmount = uni.CurrencyAmount.ether(tokenAmount.amount)
    const uniToken: uni.Token = new uni.Token(
      1,
      token1.address,
      token1.currency.decimals,
      token1.currency.symbol || "",
      token1.currency.name || ""
    );

    const uniBestTradeIn: uni.Trade = uni.Trade.bestTradeExactIn(uniPairs, uniAmount, uniToken)[0];
    const uniBestTradeOut: uni.Trade = uni.Trade.bestTradeExactOut(uniPairs, uniToken, uniAmount)[0];

    const testCases = [
      {bestTrade: bestTradeIn, feeRule: true},
      {bestTrade: bestTradeIn, feeRule: false},
      {bestTrade: bestTradeOut, feeRule: false}
    ];
    for (const {bestTrade, feeRule} of testCases) {

      const tradeOptions: App.TradeOptions = {
        feeOnTransfer: feeRule,
        recipient,
        allowedSlippage: "0.1",
        unixTimestamp: parseInt((new Date().getTime() / 1000).toFixed(0)),
        ttl: 1800
      }
      const uniTradeOptions: uni.TradeOptionsDeadline = {
        feeOnTransfer: feeRule,
        recipient,
        allowedSlippage: new uni.Percent(uni.JSBI.BigInt(1000), uni.JSBI.BigInt(10000)),
        deadline: parseInt((new Date().getTime() / 1000).toFixed(0)) + 1800
      }

      const swapParametersInvocation = await client.invoke<App.SwapParameters>({
        uri: fsUri,
        method: "swapCallParameters",
        args: {
          trade: bestTrade,
          tradeOptions: tradeOptions
        },
      });
      if (swapParametersInvocation.ok === false) throw swapParametersInvocation.error;
      const swapParameters: App.SwapParameters = swapParametersInvocation.value;
      const parsedArgs: (string | string[])[] = swapParameters.args.map((arg: string) =>
        arg.startsWith("[") && arg.endsWith("]") ? JSON.parse(arg) : arg
      );

      let expectedSwapParameters: uni.SwapParameters;
      if (bestTrade.tradeType === App.TradeTypeEnum.EXACT_INPUT || bestTrade.tradeType === "EXACT_INPUT") {
        expectedSwapParameters = uni.Router.swapCallParameters(uniBestTradeIn, uniTradeOptions);
      } else {
        expectedSwapParameters = uni.Router.swapCallParameters(uniBestTradeOut, uniTradeOptions);
      }

      expect(parsedArgs).toStrictEqual(expectedSwapParameters.args);
      expect(swapParameters.methodName).toStrictEqual(expectedSwapParameters.methodName);
      expect(swapParameters.value).toStrictEqual(expectedSwapParameters.value);
    }
  });

  it("successfully constructs swap call parameters with inexact eth in/out", async () => {
    // wrapper tokens and trades
    const token0 = tokens.filter(token => token.currency.symbol === "WBTC")[0];
    const token1 = ethToken;
    const tokenAmount: App.TokenAmount = {
      token: token0,
      amount: "100000000"
    };
    const bestTradeInArray: App.Trade[] = await getBestTradeExactIn(pairs, tokenAmount, token1, null, client, fsUri);
    const bestTradeIn: App.Trade = bestTradeInArray[0];
    const bestTradeOutArray: App.Trade[] = await getBestTradeExactOut(pairs, token1, tokenAmount, null, client, fsUri);
    const bestTradeOut: App.Trade = bestTradeOutArray[0];

    // uni tokens and trades
    const uniAmount: uni.TokenAmount = new uni.TokenAmount(new uni.Token(
      1,
      tokenAmount.token.address,
      tokenAmount.token.currency.decimals,
      tokenAmount.token.currency.symbol || "",
      tokenAmount.token.currency.name || ""
    ), tokenAmount.amount);
    const uniToken: uni.Currency = uni.ETHER;
    const uniBestTradeIn: uni.Trade = uni.Trade.bestTradeExactIn(uniPairs, uniAmount, uniToken)[0];
    const uniBestTradeOut: uni.Trade = uni.Trade.bestTradeExactOut(uniPairs, uniToken, uniAmount)[0];

    const testCases = [
      {bestTrade: bestTradeIn, feeRule: true},
      {bestTrade: bestTradeIn, feeRule: false},
      {bestTrade: bestTradeOut, feeRule: false}
    ];
    for (const {bestTrade, feeRule} of testCases) {

      const tradeOptions: App.TradeOptions = {
        feeOnTransfer: feeRule,
        recipient,
        allowedSlippage: "0.1",
        unixTimestamp: parseInt((new Date().getTime() / 1000).toFixed(0)),
        ttl: 1800
      }
      const uniTradeOptions: uni.TradeOptionsDeadline = {
        feeOnTransfer: feeRule,
        recipient,
        allowedSlippage: new uni.Percent(uni.JSBI.BigInt(1000), uni.JSBI.BigInt(10000)),
        deadline: parseInt((new Date().getTime() / 1000).toFixed(0)) + 1800
      }

      const swapParametersInvocation = await client.invoke<App.SwapParameters>({
        uri: fsUri,
        method: "swapCallParameters",
        args: {
          trade: bestTrade,
          tradeOptions: tradeOptions
        },
      });
      if (swapParametersInvocation.ok === false) throw swapParametersInvocation.error;
      const swapParameters: App.SwapParameters = swapParametersInvocation.value;
      const parsedArgs: (string | string[])[] = swapParameters.args.map((arg: string) =>
        arg.startsWith("[") && arg.endsWith("]") ? JSON.parse(arg) : arg
      );

      let expectedSwapParameters: uni.SwapParameters;
      if (bestTrade.tradeType === App.TradeTypeEnum.EXACT_INPUT || bestTrade.tradeType === "EXACT_INPUT") {
        expectedSwapParameters = uni.Router.swapCallParameters(uniBestTradeIn, uniTradeOptions);
      } else {
        expectedSwapParameters = uni.Router.swapCallParameters(uniBestTradeOut, uniTradeOptions);
      }

      expect(parsedArgs).toStrictEqual(expectedSwapParameters.args);
      expect(swapParameters.methodName).toStrictEqual(expectedSwapParameters.methodName);
      expect(swapParameters.value).toStrictEqual(expectedSwapParameters.value);
    }
  });

  it("Should successfully estimate swap call gas", async () => {
    const token0 = ethToken;
    const token1 = tokens.filter(token => token.currency.symbol === "WBTC")[0];
    const tokenAmount: App.TokenAmount = {
      token: token0,
      amount: "1000000000000000000"
    };
    const bestTradeInArray: App.Trade[] = await getBestTradeExactIn(pairs, tokenAmount, token1, null, client, fsUri);
    const bestTradeIn: App.Trade = bestTradeInArray[0];

    const tradeOptions: App.TradeOptions = {
      feeOnTransfer: false,
      recipient,
      allowedSlippage: "0.1",
      unixTimestamp: parseInt((new Date().getTime() / 1000).toFixed(0)),
      ttl: 1800
    }

    const swapParametersInvocation = await client.invoke<App.SwapParameters>({
      uri: fsUri,
      method: "swapCallParameters",
      args: {
        trade: bestTradeIn,
        tradeOptions: tradeOptions,
      },
    });
    if (swapParametersInvocation.ok === false) throw swapParametersInvocation.error;
    const swapParameters: App.SwapParameters = swapParametersInvocation.value;

    const gasEstimateResult = await client.invoke<string>({
      uri: fsUri,
      method: "estimateGas",
      args: {
        parameters: swapParameters,
        chainId: token0.chainId,
        txOverrides: {
          gasPrice: "100",
        }
      },
    });
    if (gasEstimateResult.ok === false) throw gasEstimateResult.error;
    const actualGasEstimate: string = gasEstimateResult.value;

    // parse swap parameters args
    const parsedArgs: (string | string[])[] = swapParameters.args.map((arg: string) =>
      arg.startsWith("[") && arg.endsWith("]") ? JSON.parse(arg) : arg
    );

    // get expected gas estimate
    const uniswapRouterAddress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
    const abi = [getSwapMethodAbi(swapParameters.methodName)];
    const contract = new ethers.Contract(uniswapRouterAddress, abi, ethersProvider.getSigner());
    const funcs = Object.keys(contract.interface.functions);
    const expectedGasEstimate = await contract.estimateGas[funcs[0]](...parsedArgs, {
      value: ethers.BigNumber.from(swapParameters.value),
    });

    expect(actualGasEstimate).toStrictEqual(expectedGasEstimate.toString());
  });

  it("Should call a swap statically (i.e. does not actually execute but \"pretends\" to execute) and return revert reason", async () => {
    const uniToken: App.Token = tokens.filter(token => token.currency.symbol === "UNI")[0];
    for (const tokenIn of [ethToken, uniToken]) {
      const tokenOut: App.Token = tokens.filter(token => token.currency.symbol === "WBTC")[0];
      const tokenAmount: App.TokenAmount = {
        token: tokenIn,
        amount: "10000000000000000000000000000000000000000000000"
      };

      const bestTradeInArray: App.Trade[] = await getBestTradeExactIn(pairs, tokenAmount, tokenOut, null, client, fsUri);
      const bestTrade: App.Trade = bestTradeInArray[0];

      const swapParametersInvocation = await client.invoke<App.SwapParameters>({
        uri: fsUri,
        method: "swapCallParameters",
        args: {
          trade: bestTrade,
          tradeOptions: {
            allowedSlippage: "0.1",
            recipient: recipient,
            unixTimestamp: parseInt((new Date().getTime() / 1000).toFixed(0)),
            ttl: 1800
          }
        },
      });
      if (swapParametersInvocation.ok === false) throw swapParametersInvocation.error;
      const swapParameters: App.SwapParameters = swapParametersInvocation.value;

      const swapStatic = await client.invoke<App.Ethereum_StaticTxResult>({
        uri: fsUri,
        method: "execCallStatic",
        args: {
          parameters: swapParameters,
          chainId: tokenIn.chainId,
          txOverrides: {
            gasPrice: "100",
          }
        },
      });
      if (swapStatic.ok === false) throw swapStatic.error;
      const exception: App.Ethereum_StaticTxResult | undefined = swapStatic.value;
      expect(exception?.error).toStrictEqual(true)

      // // parse swap parameters args
      // const parsedArgs: (string | string[])[] = swapParameters.args.map((arg: string) =>
      //   arg.startsWith("[") && arg.endsWith("]") ? JSON.parse(arg) : arg
      // );
      //
      // // get expected exception or lack thereof
      // const uniswapRouterAddress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
      // const abi = [getSwapMethodAbi(swapParameters.methodName)];
      // const contract = new ethers.Contract(uniswapRouterAddress, abi, ethersProvider.getSigner(recipient));
      // let ethersException = "";
      // try {
      //   await contract.callStatic[swapParameters.methodName](...parsedArgs, {
      //     value: swapParameters.value,
      //   });
      // } catch (e) {
      //   ethersException = e.toString();
      // }

      const expected = exception.result?.includes("UniswapV2: OVERFLOW") || exception.result?.includes("TRANSFER_FROM_FAILED");
      expect(expected).toBeTruthy();
    }
  });
});
