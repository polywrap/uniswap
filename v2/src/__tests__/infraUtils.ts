import { Commands } from "@polywrap/cli-js";
import axios from "axios";
import { PolywrapClientConfigBuilder, ClientConfigBuilder } from "@polywrap/client-js";
import { Connection, Connections, ethereumWalletPlugin } from "@polywrap/ethereum-wallet-js";
import { Web3 } from "@polywrap/client-config-builder-js";

export function getBuilder(): ClientConfigBuilder {
  return new PolywrapClientConfigBuilder()
    .addDefaults()
    .setPackage(
      Web3.bundle.ethereumWallet.uri,
      ethereumWalletPlugin({
        connections: new Connections({
          networks: {
            MAINNET: new Connection({ provider: "http://127.0.0.1:8546" }),
          },
          defaultNetwork: "MAINNET"
        }),
      })
  );
}

export async function initInfra(): Promise<void> {
  const { exitCode, stderr, stdout } = await Commands.infra("up", { verbose: true });

  if (exitCode) {
    throw Error(
      `initInfra failed to start test environment.\nExit Code: ${exitCode}\nStdErr: ${stderr}\nStdOut: ${stdout}`
    );
  }

  const success = await awaitResponse(
    `http://127.0.0.1:8546`,
    'jsonrpc',
    "post",
    2000,
    20000,
    '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":83}'
  );
  if (!success) {
    throw Error("initInfra: Ganache failed to start");
  }

  return Promise.resolve();
}

export async function stopInfra(): Promise<void> {
  const { exitCode, stderr, stdout } = await Commands.infra("down", { verbose: true });

  if (exitCode) {
    throw Error(
      `initInfra failed to stop test environment.\nExit Code: ${exitCode}\nStdErr: ${stderr}\nStdOut: ${stdout}`
    );
  }

  return Promise.resolve();
}

async function awaitResponse(
  url: string,
  expectedRes: string,
  getPost: "get" | "post",
  timeout: number,
  maxTimeout: number,
  data?: string
) {
  let time = 0;

  while (time < maxTimeout) {
    const request = getPost === "get" ? axios.get(url) : axios.post(url, data);
    const success = await request
      .then(function (response) {
        const responseData = JSON.stringify(response.data);
        return responseData.indexOf(expectedRes) > -1;
      })
      .catch(function () {
        return false;
      });

    if (success) {
      return true;
    }

    await new Promise<void>(function (resolve) {
      setTimeout(() => resolve(), timeout);
    });

    time += timeout;
  }

  return false;
}