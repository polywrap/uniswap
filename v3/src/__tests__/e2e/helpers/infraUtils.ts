import { runCli } from "@polywrap/cli-js";
import axios from "axios";
import { ClientConfigBuilder, DefaultBundle, IClientConfigBuilder, IWrapPackage } from "@polywrap/client-js";
import { ethereumProviderPlugin, Connections, Connection } from "@polywrap/ethereum-provider-js";

export function getSimpleConfig(): IClientConfigBuilder {
  return new ClientConfigBuilder()
    .addDefaults()
    .addPackage(
      "ens/wraps.eth:ethereum-provider@2.0.0",
      ethereumProviderPlugin({ connections: new Connections({ networks: { } }) }) as IWrapPackage
    );
}

export function getMainnetForkConfig(): IClientConfigBuilder {
  return new ClientConfigBuilder()
    .addDefaults()
    .addEnv(DefaultBundle.embeds.ipfsResolver.source.uri, {
      provider: DefaultBundle.ipfsProviders[0],
      fallbackProviders: DefaultBundle.ipfsProviders.slice(1).concat(["http://localhost:48084", "http://127.0.0.1:45005"]),
      retries: { tryResolveUri: 2, getFile: 2 },
    })
    .addPackage(
      "ens/wraps.eth:ethereum-provider@2.0.0",
      ethereumProviderPlugin({
        connections: new Connections({
          networks: {
            mainnet: new Connection({ provider: "http://localhost:8546" }),
          },
          defaultNetwork: "mainnet",
        }),
      }) as IWrapPackage,
    );
}

export async function initInfra(): Promise<void> {
  const { exitCode, stderr, stdout } = await runCli({
    args: ["infra", "up", "--verbose"]
  });

  if (exitCode) {
    throw Error(
      `initInfra failed to start test environment.\nExit Code: ${exitCode}\nStdErr: ${stderr}\nStdOut: ${stdout}`
    );
  }

  const success = await awaitResponse(
    `http://localhost:8546`,
    '"jsonrpc":',
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
  const { exitCode, stderr, stdout } = await runCli({
    args: ["infra", "down", "--verbose"]
  });

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