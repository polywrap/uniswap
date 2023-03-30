import { Connection, EthereumProvider } from "./Connection";
import { Connection as SchemaConnection } from "./wrap";
declare type Networks = {
    [network: string]: Connection;
};
export interface ConnectionsConfig {
    networks: Networks;
    defaultNetwork?: string;
}
export declare class Connections {
    private _connections;
    private _defaultNetwork;
    constructor(config: ConnectionsConfig);
    /** Returns Connection indexed by network name, or by default network if key is undefined */
    get(network?: string): Connection | undefined;
    /** sets Connection to index of network name */
    set(network: string, connection: Connection | EthereumProvider): void;
    /** sets defaultNetwork to network, and optionally sets associated connection */
    setDefaultNetwork(network: string, connection?: Connection | EthereumProvider): void;
    /** returns default network */
    getDefaultNetwork(): string;
    /** returns Connection indexed by given connection, or returns new Connection if connection is not found in store.
     * Returns default network Connection if a connection argument is not provided. */
    getConnection(connection?: SchemaConnection | null): Promise<Connection>;
}
export {};
