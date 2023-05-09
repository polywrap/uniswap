import {
  ethereumProviderPlugin,
  Connection,
  Connections,
} from "@polywrap/ethereum-provider-js";
import { IClientConfigBuilder } from "@polywrap/client-config-builder-js";
import { Wallet } from "ethers";

export function configure(builder: IClientConfigBuilder): IClientConfigBuilder {
  const defaultSigner = new Wallet(
    "0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d"
  );
  return builder
    .addDefaults()
    .addPackage(
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
      })
    )
    .addRedirect(
      "wrap://ens/ethers.wraps.eth:utils@0.0.1",
      "wrap://ipfs/QmRENy16y3p4VTXv7jXyVrPhJ9gdTMK8U8sXmLSTXW5ReF"
    )
    .addRedirect(
      "wrap://ens/ethers.wraps.eth",
      "wrap://ipfs/QmVkEd5KUkxaDLWkvxBw2dXpEJ43SkohxekFPrtDHqruhS"
    );
}
