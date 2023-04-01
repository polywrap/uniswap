"use strict";
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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
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
exports.Connections = void 0;
var Connection_1 = require("./Connection");
var providers_1 = require("@ethersproject/providers");
var networks_1 = require("./networks");
var Connections = /** @class */ (function () {
    function Connections(config) {
        var e_1, _a;
        this._connections = {};
        try {
            for (var _b = __values(Object.entries(config.networks)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), network = _d[0], connection = _d[1];
                this.set(network, connection);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        // Assign the default network (mainnet if not provided)
        if (config.defaultNetwork) {
            this.setDefaultNetwork(config.defaultNetwork);
        }
        else if (this._connections["mainnet"]) {
            this.setDefaultNetwork("mainnet");
        }
        else {
            this.setDefaultNetwork("mainnet", Connection_1.Connection.fromNetwork("mainnet"));
        }
    }
    /** Returns Connection indexed by network name, or by default network if key is undefined */
    Connections.prototype.get = function (network) {
        if (!network) {
            return this._connections[this._defaultNetwork.toLowerCase()];
        }
        return this._connections[network.toLowerCase()];
    };
    /** sets Connection to index of network name */
    Connections.prototype.set = function (network, connection) {
        var networkStr = network.toLowerCase();
        if (!(connection instanceof Connection_1.Connection)) {
            connection = new Connection_1.Connection({ provider: connection });
        }
        this._connections[networkStr] = connection;
        // Handle the case where `network` is a number
        var networkNumber = Number.parseInt(networkStr);
        if (networkNumber) {
            var namedNetwork = (0, providers_1.getNetwork)(networkNumber);
            this._connections[namedNetwork.name] = connection;
        }
    };
    /** sets defaultNetwork to network, and optionally sets associated connection */
    Connections.prototype.setDefaultNetwork = function (network, connection) {
        if (connection) {
            this.set(network, connection);
        }
        if (!this.get(network)) {
            throw Error("No connection found for network: ".concat(network));
        }
        this._defaultNetwork = network;
    };
    /** returns default network */
    Connections.prototype.getDefaultNetwork = function () {
        return this._defaultNetwork;
    };
    /** returns Connection indexed by given connection, or returns new Connection if connection is not found in store.
     * Returns default network Connection if a connection argument is not provided. */
    Connections.prototype.getConnection = function (connection) {
        return __awaiter(this, void 0, void 0, function () {
            var networkNameOrChainId, node, result, networkStr, chainId, nodeConnection, nodeNetwork, establishedConnection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!connection) {
                            return [2 /*return*/, this.get(this._defaultNetwork)];
                        }
                        networkNameOrChainId = connection.networkNameOrChainId, node = connection.node;
                        // If a custom network is provided, either get an already
                        // established connection, or a create a new one
                        if (networkNameOrChainId) {
                            networkStr = networkNameOrChainId.toLowerCase();
                            if (this.get(networkStr)) {
                                result = this.get(networkStr);
                            }
                            else {
                                chainId = Number.parseInt(networkStr);
                                if (!isNaN(chainId)) {
                                    result = Connection_1.Connection.fromNetwork(chainId);
                                }
                                else if (networkStr in networks_1.KnownNetworkId) {
                                    result = Connection_1.Connection.fromNetwork(networkStr);
                                }
                                else {
                                    result = this.get(this._defaultNetwork);
                                }
                            }
                        }
                        if (!node) return [3 /*break*/, 2];
                        nodeConnection = Connection_1.Connection.fromNode(node);
                        return [4 /*yield*/, nodeConnection.getProvider().getNetwork()];
                    case 1:
                        nodeNetwork = _a.sent();
                        establishedConnection = this.get(nodeNetwork.chainId.toString()) || this.get(nodeNetwork.name);
                        if (establishedConnection) {
                            try {
                                nodeConnection.setSigner(establishedConnection.getSigner());
                            }
                            catch (e) {
                                // It's okay if there isn't a signer available.
                            }
                        }
                        result = nodeConnection;
                        _a.label = 2;
                    case 2: return [2 /*return*/, result !== null && result !== void 0 ? result : this.get(this._defaultNetwork)];
                }
            });
        });
    };
    return Connections;
}());
exports.Connections = Connections;
//# sourceMappingURL=Connections.js.map