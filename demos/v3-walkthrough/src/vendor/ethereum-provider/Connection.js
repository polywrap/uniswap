"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connection = exports.SignerType = void 0;
var ethers_1 = require("ethers");
var providers_1 = require("@ethersproject/providers");
var address_1 = require("@ethersproject/address");
var networks_1 = require("./networks");
var SignerType;
(function (SignerType) {
    SignerType[SignerType["CUSTOM_SIGNER"] = 0] = "CUSTOM_SIGNER";
    SignerType[SignerType["PROVIDER_SIGNER"] = 1] = "PROVIDER_SIGNER";
})(SignerType = exports.SignerType || (exports.SignerType = {}));
var Connection = /** @class */ (function () {
    function Connection(_config) {
        this._config = _config;
        var provider = _config.provider, signer = _config.signer;
        // Sanitize Provider & Signer
        this.setProvider(provider, signer);
    }
    Connection.fromNetwork = function (networkish) {
        var network = typeof networkish === "number" ? networks_1.KnownNetworkId[networkish] : networkish;
        var provider = "https://".concat(network, ".infura.io/v3/1ef7451bee5e458eb26738e521ad3074");
        return new Connection({ provider: provider });
    };
    Connection.fromNode = function (node) {
        return new Connection({
            provider: node,
        });
    };
    Connection.prototype.setProvider = function (provider, signer) {
        this._config.provider = provider;
        if (typeof provider === "string") {
            this._client = ethers_1.ethers.providers.getDefaultProvider(provider, {
                infura: "1xraqrFyjLg2yrVtsN543WdKqJC",
            });
        }
        else {
            if (provider.anyNetwork !== undefined) {
                this._client = provider;
            }
            else {
                this._client = new providers_1.Web3Provider(provider);
            }
        }
        this.setSigner(signer !== null && signer !== void 0 ? signer : 0);
    };
    Connection.prototype.getProvider = function () {
        return this._client;
    };
    Connection.prototype.setSigner = function (signer) {
        if (typeof signer === "string") {
            this._config.signer = (0, address_1.getAddress)(signer);
        }
        else if (ethers_1.Signer.isSigner(signer)) {
            this._config.signer = signer;
            // This should never happen
            if (!this._client) {
                throw Error("Please call \"setProvider(...)\" before calling setSigner(...)");
            }
            this._config.signer = signer.connect(this._client);
        }
        else {
            this._config.signer = signer;
        }
    };
    Connection.prototype.getSigner = function () {
        var signer = this._config.signer;
        if (signer === undefined) {
            throw Error("Signer is undefined, this should never happen.");
        }
        if (typeof signer === "string" || typeof signer === "number") {
            if (!this._client.getSigner) {
                throw Error("Connection.getSigner: Ethereum provider does not have a signer, " +
                    "probably because it's an external RPC connection.\n" +
                    "Network: ".concat(JSON.stringify(this._client._network, null, 2)));
            }
            return this._client.getSigner(signer);
        }
        else if (ethers_1.Signer.isSigner(signer)) {
            return signer;
        }
        else {
            throw Error("Signer is an unrecognized type, this should never happen. \n".concat(signer));
        }
    };
    Connection.prototype.getSignerType = function () {
        if (ethers_1.Signer.isSigner(this._config.signer)) {
            return SignerType.CUSTOM_SIGNER;
        }
        return SignerType.PROVIDER_SIGNER;
    };
    return Connection;
}());
exports.Connection = Connection;
//# sourceMappingURL=Connection.js.map