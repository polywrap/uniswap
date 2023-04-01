import * as Types from "./types";
import { CoreClient, MaybeAsync } from "@polywrap/core-js";
import { PluginModule } from "@polywrap/plugin-js";
export interface Args_request {
    method: Types.String;
    params?: Types.Json | null;
    connection?: Types.Connection | null;
}
export interface Args_waitForTransaction {
    txHash: Types.String;
    confirmations: Types.UInt32;
    timeout?: Types.UInt32 | null;
    connection?: Types.Connection | null;
}
export interface Args_signerAddress {
    connection?: Types.Connection | null;
}
export interface Args_signMessage {
    message: Types.Bytes;
    connection?: Types.Connection | null;
}
export interface Args_signTransaction {
    rlp: Types.Bytes;
    connection?: Types.Connection | null;
}
export declare abstract class Module<TConfig> extends PluginModule<TConfig, Types.Env> {
    abstract request(args: Args_request, client: CoreClient): MaybeAsync<Types.Json>;
    abstract waitForTransaction(args: Args_waitForTransaction, client: CoreClient): MaybeAsync<Types.Boolean>;
    abstract signerAddress(args: Args_signerAddress, client: CoreClient): MaybeAsync<Types.String | null>;
    abstract signMessage(args: Args_signMessage, client: CoreClient): MaybeAsync<Types.String>;
    abstract signTransaction(args: Args_signTransaction, client: CoreClient): MaybeAsync<Types.String>;
}
