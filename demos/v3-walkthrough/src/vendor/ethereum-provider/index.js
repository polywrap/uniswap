"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.plugin = exports.ethereumProviderPlugin = exports.EthereumProviderPlugin = void 0;
var wrap_1 = require("./wrap");
var Connection_1 = require("./Connection");
var rpc_1 = require("./rpc");
var plugin_js_1 = require("@polywrap/plugin-js");
var ethers_1 = require("ethers");
__exportStar(require("./Connection"), exports);
__exportStar(require("./Connections"), exports);
var EthereumProviderPlugin = /** @class */ (function (_super) {
    __extends(EthereumProviderPlugin, _super);
    function EthereumProviderPlugin(config) {
        var _this = _super.call(this, config) || this;
        _this._connections = config.connections;
        return _this;
    }
    EthereumProviderPlugin.prototype.request = function (args, _client) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var connection, paramsStr, provider, network, signer, parameters, request, res, signer, parameters, signature, _b, _, data, payload, params_1, req, params_2, result, params, req, err_1, paramsIsArray, messageContains0x2, req;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this._getConnection(args.connection)];
                    case 1:
                        connection = _c.sent();
                        paramsStr = (_a = args === null || args === void 0 ? void 0 : args.params) !== null && _a !== void 0 ? _a : "[]";
                        provider = connection.getProvider();
                        if (!(args.method === "eth_chainId")) return [3 /*break*/, 3];
                        return [4 /*yield*/, provider.getNetwork()];
                    case 2:
                        network = _c.sent();
                        return [2 /*return*/, JSON.stringify("0x" + network.chainId.toString(16))];
                    case 3:
                        if (!(args.method === "eth_sendTransaction" &&
                            connection.getSignerType() == Connection_1.SignerType.CUSTOM_SIGNER)) return [3 /*break*/, 6];
                        return [4 /*yield*/, connection.getSigner()];
                    case 4:
                        signer = _c.sent();
                        parameters = rpc_1.eth_sendTransaction.deserializeParameters(paramsStr);
                        request = rpc_1.eth_sendTransaction.toEthers(parameters[0]);
                        return [4 /*yield*/, signer.sendTransaction(request)];
                    case 5:
                        res = _c.sent();
                        return [2 /*return*/, JSON.stringify(res.hash)];
                    case 6:
                        if (!(args.method === "eth_signTypedData_v4" &&
                            connection.getSignerType() == Connection_1.SignerType.CUSTOM_SIGNER)) return [3 /*break*/, 10];
                        return [4 /*yield*/, connection.getSigner()];
                    case 7:
                        signer = _c.sent();
                        parameters = rpc_1.eth_signTypedData.deserializeParameters(paramsStr);
                        signature = "";
                        if (!("_signTypedData" in signer)) return [3 /*break*/, 9];
                        _b = __read(parameters, 2), _ = _b[0], data = _b[1];
                        payload = rpc_1.eth_signTypedData.toEthers(data);
                        return [4 /*yield*/, signer._signTypedData(payload.domain, payload.types, payload.message)];
                    case 8:
                        // @ts-ignore
                        signature = _c.sent();
                        _c.label = 9;
                    case 9: return [2 /*return*/, JSON.stringify(signature)];
                    case 10:
                        if (!(args.method === "eth_signTypedData_v4")) return [3 /*break*/, 12];
                        params_1 = JSON.parse(paramsStr);
                        return [4 /*yield*/, provider.send(args.method, [params_1[0], JSON.stringify(params_1[1])])];
                    case 11:
                        req = _c.sent();
                        return [2 /*return*/, JSON.stringify(req)];
                    case 12:
                        if (args.method === "eth_encodePacked") {
                            params_2 = rpc_1.eth_encodePacked.deserializeParameters(paramsStr);
                            result = ethers_1.ethers.utils.solidityPack(params_2.types, params_2.values);
                            return [2 /*return*/, JSON.stringify(result)];
                        }
                        params = JSON.parse(paramsStr);
                        _c.label = 13;
                    case 13:
                        _c.trys.push([13, 15, , 19]);
                        return [4 /*yield*/, provider.send(args.method, params)];
                    case 14:
                        req = _c.sent();
                        return [2 /*return*/, JSON.stringify(req)];
                    case 15:
                        err_1 = _c.sent();
                        paramsIsArray = Array.isArray(params) && params.length > 0;
                        messageContains0x2 = err_1 && err_1.message && err_1.message.indexOf("0x2") > -1;
                        if (!(messageContains0x2 && paramsIsArray && params[0].type === "0x02")) return [3 /*break*/, 17];
                        params[0].type = "0x2";
                        return [4 /*yield*/, provider.send(args.method, params)];
                    case 16:
                        req = _c.sent();
                        return [2 /*return*/, JSON.stringify(req)];
                    case 17: throw err_1;
                    case 18: return [3 /*break*/, 19];
                    case 19: return [2 /*return*/];
                }
            });
        });
    };
    EthereumProviderPlugin.prototype.waitForTransaction = function (args, _client) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var connection, provider;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this._getConnection(args.connection)];
                    case 1:
                        connection = _b.sent();
                        provider = connection.getProvider();
                        return [4 /*yield*/, provider.waitForTransaction(args.txHash, args.confirmations, (_a = args.timeout) !== null && _a !== void 0 ? _a : undefined)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    EthereumProviderPlugin.prototype.signerAddress = function (args, _client) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, _error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this._getConnection(args.connection)];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.getSigner().getAddress()];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        _error_1 = _a.sent();
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    EthereumProviderPlugin.prototype.signMessage = function (args, _client) {
        return __awaiter(this, void 0, void 0, function () {
            var connection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._getConnection(args.connection)];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.getSigner().signMessage(args.message)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    EthereumProviderPlugin.prototype.signTransaction = function (args, _client) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, request, signedTxHex, signedTx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._getConnection(args.connection)];
                    case 1:
                        connection = _a.sent();
                        request = this._parseTransaction(args.rlp);
                        return [4 /*yield*/, connection.getSigner().signTransaction(request)];
                    case 2:
                        signedTxHex = _a.sent();
                        signedTx = ethers_1.ethers.utils.parseTransaction(signedTxHex);
                        return [2 /*return*/, ethers_1.ethers.utils.joinSignature(signedTx)];
                }
            });
        });
    };
    EthereumProviderPlugin.prototype._getConnection = function (connection) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._connections.getConnection(connection !== null && connection !== void 0 ? connection : this.env.connection)];
            });
        });
    };
    EthereumProviderPlugin.prototype._parseTransaction = function (rlp) {
        var tx = ethers_1.ethers.utils.parseTransaction(rlp);
        // r, s, v can sometimes be set to 0, but ethers will throw if the keys exist at all
        var request = __assign(__assign({}, tx), { r: undefined, s: undefined, v: undefined });
        // remove undefined and null values
        request = Object.keys(request).reduce(function (prev, curr) {
            var val = request[curr];
            if (val !== undefined && val !== null)
                prev[curr] = val;
            return prev;
        }, {});
        return request;
    };
    return EthereumProviderPlugin;
}(wrap_1.Module));
exports.EthereumProviderPlugin = EthereumProviderPlugin;
var ethereumProviderPlugin = function (config) {
    return new plugin_js_1.PluginPackage(new EthereumProviderPlugin(config), wrap_1.manifest);
};
exports.ethereumProviderPlugin = ethereumProviderPlugin;
exports.plugin = exports.ethereumProviderPlugin;
//# sourceMappingURL=index.js.map