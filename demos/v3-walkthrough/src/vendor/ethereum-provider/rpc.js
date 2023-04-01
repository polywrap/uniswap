"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eth_encodePacked = exports.eth_signTypedData = exports.eth_sendTransaction = void 0;
// Ref: https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_sendtransaction
var eth_sendTransaction;
(function (eth_sendTransaction) {
    function deserializeParameters(input) {
        var params = JSON.parse(input);
        if (params.length < 1 || typeof params[0] !== "object") {
            throw new Error("Invalid JSON-RPC parameters provided for eth_sendTransaction method. Reference: " +
                "https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_sendtransaction");
        }
        var transaction = params[0];
        if (!transaction.from) {
            throw new Error("The 'from' property on the transaction object parameter is required for the eth_sendTransaction method. Reference: " +
                "https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_sendtransaction");
        }
        if (!transaction.data) {
            throw new Error("The 'data' property on the transaction object parameter is required for the eth_sendTransaction method. Reference: " +
                "https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_sendtransaction");
        }
        return [transaction];
    }
    eth_sendTransaction.deserializeParameters = deserializeParameters;
    function toEthers(transaction) {
        var result = __assign(__assign({}, transaction), { 
            // Ethers.js expects `gasLimit` instead of `gas`
            gasLimit: transaction.gas });
        delete result.gas;
        // Ethers.js expects "0" | "1" | "2"
        // but it's being received as hex (e.g: "0x02")
        if ("type" in transaction) {
            result.type = parseInt(transaction.type);
        }
        return result;
    }
    eth_sendTransaction.toEthers = toEthers;
})(eth_sendTransaction = exports.eth_sendTransaction || (exports.eth_sendTransaction = {}));
// Ref: https://github.com/ethereum/EIPs/blob/master/EIPS/eip-712.md
var eth_signTypedData;
(function (eth_signTypedData) {
    function deserializeParameters(input) {
        var params = JSON.parse(input);
        if (params.length < 2 ||
            typeof params[0] !== "string" ||
            typeof params[1] !== "object") {
            throw new Error("Invalid JSON-RPC parameters provided for eth_signTypedData method. Reference: " +
                "https://github.com/ethereum/EIPs/blob/master/EIPS/eip-712.md#parameters");
        }
        return params;
    }
    eth_signTypedData.deserializeParameters = deserializeParameters;
    function toEthers(typedData) {
        var types = typedData.types;
        delete types.EIP712Domain;
        return {
            domain: typedData.domain,
            types: types,
            message: typedData.message
        };
    }
    eth_signTypedData.toEthers = toEthers;
})(eth_signTypedData = exports.eth_signTypedData || (exports.eth_signTypedData = {}));
var eth_encodePacked;
(function (eth_encodePacked) {
    function deserializeParameters(paramsStr) {
        var params = JSON.parse(paramsStr);
        if (typeof params === "object"
            && "types" in params
            && "values" in params
            && Array.isArray(params.types)
            && Array.isArray(params.values)
            && typeof params.types[0] === "string") {
            return {
                types: params.types,
                values: parseValues(params.values)
            };
        }
        throw new Error("Invalid JSON-RPC parameters provided for eth_encodePacked method. " +
            "Expected JSON of the form: { types: string[], values: string[] }");
    }
    eth_encodePacked.deserializeParameters = deserializeParameters;
    function parseValues(values) {
        if (!values) {
            return [];
        }
        return values.map(function (arg) {
            return (arg.startsWith("[") && arg.endsWith("]")) ||
                (arg.startsWith("{") && arg.endsWith("}"))
                ? JSON.parse(arg)
                : arg;
        });
    }
})(eth_encodePacked = exports.eth_encodePacked || (exports.eth_encodePacked = {}));
//# sourceMappingURL=rpc.js.map