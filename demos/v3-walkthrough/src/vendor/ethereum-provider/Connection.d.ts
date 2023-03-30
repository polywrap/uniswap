import { Signer, ethers } from "ethers";
import { ExternalProvider, JsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import { KnownNetwork } from "./networks";
export declare type Address = string;
export declare type AccountIndex = number;
export declare type EthereumSigner = Signer | Address | AccountIndex;
export declare type EthereumProvider = string | ExternalProvider | JsonRpcProvider;
export declare type EthereumClient = Web3Provider | JsonRpcProvider;
export interface ConnectionConfig {
    provider: EthereumProvider;
    signer?: EthereumSigner;
}
export declare enum SignerType {
    CUSTOM_SIGNER = 0,
    PROVIDER_SIGNER = 1
}
export declare class Connection {
    private _config;
    private _client;
    constructor(_config: ConnectionConfig);
    static fromNetwork(networkish: KnownNetwork): Connection;
    static fromNode(node: string): Connection;
    setProvider(provider: EthereumProvider, signer?: EthereumSigner): void;
    getProvider(): EthereumClient;
    setSigner(signer: EthereumSigner): void;
    getSigner(): ethers.Signer;
    getSignerType(): SignerType;
}
