import {
  ethereumProviderPlugin,
  Connection,
  Connections,
} from "@polywrap/ethereum-provider-js";
import { IWrapPackage, ClientConfigBuilder } from "@polywrap/client-js";
import { Wallet } from "ethers";

export function configure(builder: ClientConfigBuilder): ClientConfigBuilder {
  const defaultSigner = new Wallet(
    "0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d"
  );
  return builder.addDefaults().setPackage(
    "wrap://ens/wraps.eth:ethereum-provider@2.0.0",
    ethereumProviderPlugin({
      connections: new Connections({
        networks: {
          mainnet: new Connection({
            provider: "http://localhost:8546",
            signer: defaultSigner,
          }),
        },
        defaultNetwork: "mainnet",
      }),
    }) as IWrapPackage
  );
}
