import { PolywrapClient } from "@polywrap/client-js";
import {
  ChainIdEnum,
  Ethers_TxResponse,
  MethodParameters,
  Pool,
  Token,
  TokenAmount,
  Trade,
  getPoolFromAddress, getPools, getTokens,
  bestTradeExactOut, getNative, swapCallParameters,
  getMainnetForkConfig, initInfra, stopInfra, Ethers_TxReceipt,
} from "../helpers";
import path from "path";
import * as ethers from "ethers";
import erc20ABI from "../testData/erc20ABI.json";

jest.setTimeout(360000);

describe("Call (mainnet fork)", () => {

  const ROUTER_ADDRESS = "0xE592427A0AEce92De3Edee1F18E0157C05861564";
  const USDC_ETH_03_ADDRESS = "0x8ad599c3A0ff1De082011EFDDc58f1908eb6e6D8";

  let client: PolywrapClient;
  let fsUri: string;
  let ethersProvider: ethers.providers.JsonRpcProvider;
  let recipient: string;

  beforeAll(async () => {
    await initInfra();
    // get client
    const config = getMainnetForkConfig().build();
    client = new PolywrapClient(config);
    // get uri
    const wrapperAbsPath: string = path.resolve(__dirname + "/../../../../");
    fsUri = "fs/" + wrapperAbsPath + '/build';
    // set up ethers provider
    ethersProvider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8546");
    recipient = await ethersProvider.getSigner().getAddress();
  });

  afterAll(async () => {
    await stopInfra();
  });

  it("successfully approves token transfers", async () => {
    const tokens: Token[] = getTokens(await getPools(client, fsUri));
    for (const token of tokens) {
      const txResponse = await client.invoke<Ethers_TxResponse>({
        uri: fsUri,
        method: "approve",
        args: { token },
      });
      if (txResponse.ok == false) fail(txResponse.error);

      const approve: string = txResponse.value.hash;
      const approveTx = await ethersProvider.getTransaction(approve);
      const receipt = await approveTx.wait();
      expect(receipt.status).toBeTruthy();
    }
  });

  it("execCall: swap eth -> usdc", async () => {
    const pools: Pool[] = [await getPoolFromAddress(client, fsUri, USDC_ETH_03_ADDRESS, true)];
    const tokens: Token[] = getTokens(pools);

    // approve token transfers
    for (const token of tokens) {
      const txResponse = await client.invoke<Ethers_TxResponse>({
        uri: fsUri,
        method: "approve",
        args: { token },
      });
      if (txResponse.ok == false) fail(txResponse.error);
      const approve: string = txResponse.value.hash;
      const approveTx = await ethersProvider.getTransaction(approve);
      await approveTx.wait();
    }

    const ETH: Token = await getNative(client, fsUri, ChainIdEnum.MAINNET);
    const USDC: Token = tokens.find(token => token.currency.symbol === "USDC") as Token;

    // eth -> usdc preparation
    const usdcOut: TokenAmount = { token: USDC, amount: "10000000000" }
    const ethUsdcTrade: Trade = (await bestTradeExactOut(client, fsUri, pools, ETH, usdcOut))[0];
    const ethUsdcParams: MethodParameters = await swapCallParameters(client, fsUri, [ethUsdcTrade], {
      slippageTolerance: "0.1",
      recipient,
      deadline: (new Date().getTime() / 1000 + 1800).toFixed(0),
    });

    // execCall eth -> usdc
    const ethUsdcQuery = await client.invoke<Ethers_TxResponse>({
      uri: fsUri,
      method: "execCall",
      args: {
        parameters: ethUsdcParams,
        address: ROUTER_ADDRESS,
        chainId: ChainIdEnum[ChainIdEnum.MAINNET],
      },
    });
    if (ethUsdcQuery.ok == false) fail(ethUsdcQuery.error);

    const ethUsdcHash: string = ethUsdcQuery.value.hash ?? "";
    const ethUsdcTx = await ethersProvider.getTransaction(ethUsdcHash);
    const ethUsdcTxResponse = await ethUsdcTx.wait();
    expect(ethUsdcTxResponse.status).toBeTruthy();

    const usdcContract = new ethers.Contract(USDC.address, erc20ABI, ethersProvider);
    const usdcBalance: ethers.BigNumber = await usdcContract.balanceOf(recipient);
    expect(usdcBalance.gt(usdcOut.amount)).toBeTruthy();
  });


  it("execCall: quoteCallParamters", async () => {
    const quoterAddress = "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6";
    const quoteCallParameters = {
        "calldata": "0xf7729d43000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb480000000000000000000000000000000000000000000000000000000000000bb80000000000000000000000000000000000000000000000000de0b6b3a76400000000000000000000000000000000000000000000000000000000000000000000",
        "value": "0x00"
      };

    const result = await client.invoke<Ethers_TxResponse>({
      uri: fsUri,
      method: "execCall",
      args: {
        parameters: quoteCallParameters,
        address: quoterAddress,
        chainId: ChainIdEnum[ChainIdEnum.MAINNET]
      },
    });
    if (result.ok == false) throw result.error;
    expect(result.value).toBeTruthy();

    const wait = await client.invoke<Ethers_TxReceipt>({
      uri: "wrap://wrapscan.io/polywrap/ethers@1.1",
      method: "awaitTransaction",
      args: {
        txHash: result.value.hash,
        confirmations: 1
      }
    });
    if (wait.ok == false) throw wait.error;

    const quote = await ethersProvider.call({
      to: quoterAddress,
      data: quoteCallParameters.calldata
    });

    expect(quote).toBeTruthy();

    console.log(ethers.BigNumber.from(quote).toString());
  })
});
