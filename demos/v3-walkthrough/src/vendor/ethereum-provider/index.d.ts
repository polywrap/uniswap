import { Module, CoreClient, Args_request, Args_signMessage, Args_signTransaction, Args_waitForTransaction, Args_signerAddress } from "./wrap";
import { Connections } from "./Connections";
import { PluginFactory } from "@polywrap/plugin-js";
export * from "./Connection";
export * from "./Connections";
export interface ProviderConfig {
    connections: Connections;
}
export declare class EthereumProviderPlugin extends Module<ProviderConfig> {
    private _connections;
    constructor(config: ProviderConfig);
    request(args: Args_request, _client: CoreClient): Promise<string>;
    waitForTransaction(args: Args_waitForTransaction, _client: CoreClient): Promise<boolean>;
    signerAddress(args: Args_signerAddress, _client: CoreClient): Promise<string | null>;
    signMessage(args: Args_signMessage, _client: CoreClient): Promise<string>;
    signTransaction(args: Args_signTransaction, _client: CoreClient): Promise<string>;
    private _getConnection;
    private _parseTransaction;
}
export declare const ethereumProviderPlugin: PluginFactory<ProviderConfig>;
export declare const plugin: PluginFactory<ProviderConfig>;
