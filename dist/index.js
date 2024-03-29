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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var fs_1 = __importDefault(require("fs"));
var Cache = /** @class */ (function () {
    function Cache() {
        this.path = './cache/';
    }
    Cache.prototype.setPath = function (path) {
        this.path = path;
    };
    Cache.prototype.clearCache = function () {
        if (fs_1.default.rmdirSync(this.path, { recursive: true }) != undefined) {
            throw new Error("error clearing cache");
        }
    };
    Cache.prototype.readInCache = function (name, schema, query, functionality) {
        var _this = this;
        if (functionality === void 0) { functionality = 1; }
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                fs_1.default.readFile(this.path + name + '.json', function (err, data) { return __awaiter(_this, void 0, void 0, function () {
                    var found, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                if (!err) return [3 /*break*/, 5];
                                if (!(functionality == 1)) return [3 /*break*/, 2];
                                return [4 /*yield*/, schema.findOne(query)];
                            case 1:
                                _a = _b.sent();
                                return [3 /*break*/, 4];
                            case 2: return [4 /*yield*/, schema.find(query)];
                            case 3:
                                _a = _b.sent();
                                _b.label = 4;
                            case 4:
                                found = _a;
                                if (!!found) {
                                    this.saveInCache(name, found);
                                    resolve(found);
                                }
                                else
                                    resolve(null);
                                return [3 /*break*/, 6];
                            case 5:
                                resolve(JSON.parse(data));
                                _b.label = 6;
                            case 6: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        }); });
    };
    Cache.prototype.saveInCache = function (name, data) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        fs_1.default.mkdir(_this.path, { recursive: true }, function (err) {
                            if (err)
                                return reject(err);
                            fs_1.default.writeFile(_this.path + name + '.json', JSON.stringify(data), function (err) {
                                if (err)
                                    reject(err);
                                else
                                    resolve(null);
                            });
                        });
                    })];
            });
        });
    };
    return Cache;
}());
module.exports = new Cache();
