import ethers from "ethers";
export declare namespace eth_sendTransaction {
    interface Transaction {
        from: string;
        to?: string;
        gas?: string;
        gasPrice?: string;
        value?: string;
        data: string;
        nonce?: string;
    }
    type Parameters = [Transaction];
    type Returns = string;
    function deserializeParameters(input: string): Parameters;
    function toEthers(transaction: Transaction): ethers.providers.TransactionRequest;
}
export declare namespace eth_signTypedData {
    interface TypedData {
        types: {
            EIP712Domain: unknown[];
            [key: string]: {
                name: string;
                type: string;
                [key: string]: unknown;
            }[] | unknown;
        };
        primaryType: string;
        domain: {
            [key: string]: unknown;
        };
        message: {
            [key: string]: unknown;
        };
        [key: string]: unknown;
    }
    type Parameters = [
        string,
        TypedData
    ];
    type Returns = string;
    function deserializeParameters(input: string): Parameters;
    type EthersTypedData = {
        domain: TypedData["domain"];
        types: {
            [key: string]: unknown;
        };
        message: TypedData["message"];
    };
    function toEthers(typedData: TypedData): EthersTypedData;
}
export declare namespace eth_encodePacked {
    function deserializeParameters(paramsStr: string): {
        types: string[];
        values: unknown[];
    };
}
