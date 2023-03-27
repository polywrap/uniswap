import { UniswapV3 } from "../";

import {
  PolywrapClient,
  ClientConfigBuilder,
  DefaultBundle
} from "@polywrap/client-js";

jest.setTimeout(120000);

describe("e2e", () => {
  it("works", async () => {
    const config = new ClientConfigBuilder()
      .add(DefaultBundle.getConfig())
      .build();

    const client = new PolywrapClient(config);

    const result = await UniswapV3.getPoolAddress({
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
    }, client);

    if (!result.ok) throw result.error;

    expect(result.value).toBe("0x8ad599c3A0ff1De082011EFDDc58f1908eb6e6D8");
  });
});
