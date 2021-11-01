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
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
var constants_1 = require("../helpers/constants");
var path_1 = __importDefault(require("path"));
var accounts_1 = require("../helpers/accounts");
var web3_js_1 = require("@solana/web3.js");
var fs_1 = __importDefault(require("fs"));
var anchor_1 = require("@project-serum/anchor");
var cache_1 = require("../helpers/cache");
var loglevel_1 = __importDefault(require("loglevel"));
var aws_1 = require("../helpers/upload/aws");
var arweave_1 = require("../helpers/upload/arweave");
var ipfs_1 = require("../helpers/upload/ipfs");
var various_1 = require("../helpers/various");
function upload(files, cacheName, env, keypair, totalNFTs, storage, retainAuthority, mutable, ipfsCredentials, awsS3Bucket) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var uploadSuccessful, savedContent, cacheContent, existingInCache, seen, newFiles, images, SIZE, walletKeyPair, anchorProgram, config, i, image, imageName, index, link, manifestPath, manifestContent, manifest, manifestBuffer, res, exx_1, er_1, keys, e_1;
        var _this = this;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    uploadSuccessful = true;
                    savedContent = (0, cache_1.loadCache)(cacheName, env);
                    cacheContent = savedContent || {};
                    if (!cacheContent.program) {
                        cacheContent.program = {};
                    }
                    existingInCache = [];
                    if (!cacheContent.items) {
                        cacheContent.items = {};
                    }
                    else {
                        existingInCache = Object.keys(cacheContent.items);
                    }
                    seen = {};
                    newFiles = [];
                    files.forEach(function (f) {
                        if (!seen[f.replace(constants_1.EXTENSION_PNG, '').split('/').pop()]) {
                            seen[f.replace(constants_1.EXTENSION_PNG, '').split('/').pop()] = true;
                            newFiles.push(f);
                        }
                    });
                    existingInCache.forEach(function (f) {
                        if (!seen[f]) {
                            seen[f] = true;
                            newFiles.push(f + '.png');
                        }
                    });
                    images = newFiles.filter(function (val) { return path_1.default.extname(val) === constants_1.EXTENSION_PNG; });
                    SIZE = images.length;
                    walletKeyPair = (0, accounts_1.loadWalletKey)(keypair);
                    return [4 /*yield*/, (0, accounts_1.loadCandyProgram)(walletKeyPair, env)];
                case 1:
                    anchorProgram = _c.sent();
                    config = cacheContent.program.config
                        ? new web3_js_1.PublicKey(cacheContent.program.config)
                        : undefined;
                    i = 0;
                    _c.label = 2;
                case 2:
                    if (!(i < SIZE)) return [3 /*break*/, 16];
                    image = images[i];
                    imageName = path_1.default.basename(image);
                    index = imageName.replace(constants_1.EXTENSION_PNG, '');
                    if (i % 50 === 0) {
                        loglevel_1.default.info("Processing file: " + i);
                    }
                    else {
                        loglevel_1.default.debug("Processing file: " + i);
                    }
                    link = (_b = (_a = cacheContent === null || cacheContent === void 0 ? void 0 : cacheContent.items) === null || _a === void 0 ? void 0 : _a[index]) === null || _b === void 0 ? void 0 : _b.link;
                    if (!(!link || !cacheContent.program.uuid)) return [3 /*break*/, 15];
                    manifestPath = image.replace(constants_1.EXTENSION_PNG, '.json');
                    manifestContent = fs_1.default
                        .readFileSync(manifestPath)
                        .toString()
                        .replace(imageName, 'image.png')
                        .replace(imageName, 'image.png');
                    manifest = JSON.parse(manifestContent);
                    manifestBuffer = Buffer.from(JSON.stringify(manifest));
                    if (!(i === 0 && !cacheContent.program.uuid)) return [3 /*break*/, 6];
                    // initialize config
                    loglevel_1.default.info("initializing config");
                    _c.label = 3;
                case 3:
                    _c.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, (0, accounts_1.createConfig)(anchorProgram, walletKeyPair, {
                            maxNumberOfLines: new anchor_1.BN(totalNFTs),
                            symbol: manifest.symbol,
                            sellerFeeBasisPoints: manifest.seller_fee_basis_points,
                            isMutable: mutable,
                            maxSupply: new anchor_1.BN(0),
                            retainAuthority: retainAuthority,
                            creators: manifest.properties.creators.map(function (creator) {
                                return {
                                    address: new web3_js_1.PublicKey(creator.address),
                                    verified: true,
                                    share: creator.share,
                                };
                            }),
                        })];
                case 4:
                    res = _c.sent();
                    cacheContent.program.uuid = res.uuid;
                    cacheContent.program.config = res.config.toBase58();
                    config = res.config;
                    loglevel_1.default.info("initialized config for a candy machine with publickey: " + res.config.toBase58());
                    (0, cache_1.saveCache)(cacheName, env, cacheContent);
                    return [3 /*break*/, 6];
                case 5:
                    exx_1 = _c.sent();
                    loglevel_1.default.error('Error deploying config to Solana network.', exx_1);
                    throw exx_1;
                case 6:
                    if (!!link) return [3 /*break*/, 15];
                    _c.label = 7;
                case 7:
                    _c.trys.push([7, 14, , 15]);
                    if (!(storage === 'arweave')) return [3 /*break*/, 9];
                    return [4 /*yield*/, (0, arweave_1.arweaveUpload)(walletKeyPair, anchorProgram, env, image, manifestBuffer, manifest, index)];
                case 8:
                    link = _c.sent();
                    return [3 /*break*/, 13];
                case 9:
                    if (!(storage === 'ipfs')) return [3 /*break*/, 11];
                    return [4 /*yield*/, (0, ipfs_1.ipfsUpload)(ipfsCredentials, image, manifestBuffer)];
                case 10:
                    link = _c.sent();
                    return [3 /*break*/, 13];
                case 11:
                    if (!(storage === 'aws')) return [3 /*break*/, 13];
                    return [4 /*yield*/, (0, aws_1.awsUpload)(awsS3Bucket, image, manifestBuffer)];
                case 12:
                    link = _c.sent();
                    _c.label = 13;
                case 13:
                    if (link) {
                        loglevel_1.default.debug('setting cache for ', index);
                        cacheContent.items[index] = {
                            link: link,
                            name: manifest.name,
                            onChain: false,
                        };
                        cacheContent.authority = walletKeyPair.publicKey.toBase58();
                        (0, cache_1.saveCache)(cacheName, env, cacheContent);
                    }
                    return [3 /*break*/, 15];
                case 14:
                    er_1 = _c.sent();
                    uploadSuccessful = false;
                    loglevel_1.default.error("Error uploading file " + index, er_1);
                    return [3 /*break*/, 15];
                case 15:
                    i++;
                    return [3 /*break*/, 2];
                case 16:
                    keys = Object.keys(cacheContent.items);
                    _c.label = 17;
                case 17:
                    _c.trys.push([17, 19, 20, 21]);
                    return [4 /*yield*/, Promise.all((0, various_1.chunks)(Array.from(Array(keys.length).keys()), 1000).map(function (allIndexesInSlice) { return __awaiter(_this, void 0, void 0, function () {
                            var offset, indexes, onChain, ind, e_2;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        offset = 0;
                                        _a.label = 1;
                                    case 1:
                                        if (!(offset < allIndexesInSlice.length)) return [3 /*break*/, 6];
                                        indexes = allIndexesInSlice.slice(offset, offset + 10);
                                        onChain = indexes.filter(function (i) {
                                            var _a;
                                            var index = keys[i];
                                            return ((_a = cacheContent.items[index]) === null || _a === void 0 ? void 0 : _a.onChain) || false;
                                        });
                                        ind = keys[indexes[0]];
                                        if (!(onChain.length != indexes.length)) return [3 /*break*/, 5];
                                        loglevel_1.default.info("Writing indices " + ind + "-" + keys[indexes[indexes.length - 1]]);
                                        _a.label = 2;
                                    case 2:
                                        _a.trys.push([2, 4, , 5]);
                                        return [4 /*yield*/, anchorProgram.rpc.addConfigLines(ind, indexes.map(function (i) { return ({
                                                uri: cacheContent.items[keys[i]].link,
                                                name: cacheContent.items[keys[i]].name,
                                            }); }), {
                                                accounts: {
                                                    config: config,
                                                    authority: walletKeyPair.publicKey,
                                                },
                                                signers: [walletKeyPair],
                                            })];
                                    case 3:
                                        _a.sent();
                                        indexes.forEach(function (i) {
                                            cacheContent.items[keys[i]] = __assign(__assign({}, cacheContent.items[keys[i]]), { onChain: true });
                                        });
                                        (0, cache_1.saveCache)(cacheName, env, cacheContent);
                                        return [3 /*break*/, 5];
                                    case 4:
                                        e_2 = _a.sent();
                                        loglevel_1.default.error("saving config line " + ind + "-" + keys[indexes[indexes.length - 1]] + " failed", e_2);
                                        uploadSuccessful = false;
                                        return [3 /*break*/, 5];
                                    case 5:
                                        offset += 10;
                                        return [3 /*break*/, 1];
                                    case 6: return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 18:
                    _c.sent();
                    return [3 /*break*/, 21];
                case 19:
                    e_1 = _c.sent();
                    loglevel_1.default.error(e_1);
                    return [3 /*break*/, 21];
                case 20:
                    (0, cache_1.saveCache)(cacheName, env, cacheContent);
                    return [7 /*endfinally*/];
                case 21:
                    console.log("Done. Successful = " + uploadSuccessful + ".");
                    return [2 /*return*/, uploadSuccessful];
            }
        });
    });
}
exports.upload = upload;
