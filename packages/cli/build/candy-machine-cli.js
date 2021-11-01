#!/usr/bin/env ts-node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var commander_1 = require("commander");
var anchor = __importStar(require("@project-serum/anchor"));
var node_fetch_1 = __importDefault(require("node-fetch"));
var various_1 = require("./helpers/various");
var spl_token_1 = require("@solana/spl-token");
var web3_js_1 = require("@solana/web3.js");
var constants_1 = require("./helpers/constants");
var accounts_1 = require("./helpers/accounts");
var upload_1 = require("./commands/upload");
var verifyTokenMetadata_1 = require("./commands/verifyTokenMetadata");
var generateConfigurations_1 = require("./commands/generateConfigurations");
var cache_1 = require("./helpers/cache");
var mint_1 = require("./commands/mint");
var sign_1 = require("./commands/sign");
var signAll_1 = require("./commands/signAll");
var loglevel_1 = __importDefault(require("loglevel"));
var metadata_1 = require("./helpers/metadata");
var createArt_1 = require("./commands/createArt");
commander_1.program.version('0.0.2');
if (!fs.existsSync(constants_1.CACHE_PATH)) {
    fs.mkdirSync(constants_1.CACHE_PATH);
}
loglevel_1.default.setLevel(loglevel_1.default.levels.INFO);
programCommand('upload')
    .argument('<directory>', 'Directory containing images named from 0-n', function (val) {
    return fs.readdirSync("" + val).map(function (file) { return path.join(val, file); });
})
    .option('-n, --number <number>', 'Number of images to upload')
    .option('-s, --storage <string>', 'Database to use for storage (arweave, ipfs, aws)', 'arweave')
    .option('--ipfs-infura-project-id <string>', 'Infura IPFS project id (required if using IPFS)')
    .option('--ipfs-infura-secret <string>', 'Infura IPFS scret key (required if using IPFS)')
    .option('--aws-s3-bucket <string>', '(existing) AWS S3 Bucket name (required if using aws)')
    .option('--no-retain-authority', 'Do not retain authority to update metadata')
    .option('--no-mutable', 'Metadata will not be editable')
    .action(function (files, options, cmd) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, number, keypair, env, cacheName, storage, ipfsInfuraProjectId, ipfsInfuraSecret, awsS3Bucket, retainAuthority, mutable, ipfsCredentials, pngFileCount, jsonFileCount, parsedNumber, elemCount, startMs, warn, successful, endMs, timeTaken;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = cmd.opts(), number = _a.number, keypair = _a.keypair, env = _a.env, cacheName = _a.cacheName, storage = _a.storage, ipfsInfuraProjectId = _a.ipfsInfuraProjectId, ipfsInfuraSecret = _a.ipfsInfuraSecret, awsS3Bucket = _a.awsS3Bucket, retainAuthority = _a.retainAuthority, mutable = _a.mutable;
                if (storage === 'ipfs' && (!ipfsInfuraProjectId || !ipfsInfuraSecret)) {
                    throw new Error('IPFS selected as storage option but Infura project id or secret key were not provided.');
                }
                if (storage === 'aws' && !awsS3Bucket) {
                    throw new Error('aws selected as storage option but existing bucket name (--aws-s3-bucket) not provided.');
                }
                if (!(storage === 'arweave' || storage === 'ipfs' || storage === 'aws')) {
                    throw new Error("Storage option must either be 'arweave', 'ipfs', or 'aws'.");
                }
                ipfsCredentials = {
                    projectId: ipfsInfuraProjectId,
                    secretKey: ipfsInfuraSecret,
                };
                pngFileCount = files.filter(function (it) {
                    return it.endsWith(constants_1.EXTENSION_PNG);
                }).length;
                jsonFileCount = files.filter(function (it) {
                    return it.endsWith(constants_1.EXTENSION_JSON);
                }).length;
                parsedNumber = parseInt(number);
                elemCount = parsedNumber ? parsedNumber : pngFileCount;
                if (pngFileCount !== jsonFileCount) {
                    throw new Error("number of png files (" + pngFileCount + ") is different than the number of json files (" + jsonFileCount + ")");
                }
                if (elemCount < pngFileCount) {
                    throw new Error("max number (" + elemCount + ")cannot be smaller than the number of elements in the source folder (" + pngFileCount + ")");
                }
                loglevel_1.default.info("Beginning the upload for " + elemCount + " (png+json) pairs");
                startMs = Date.now();
                loglevel_1.default.info('started at: ' + startMs.toString());
                warn = false;
                _b.label = 1;
            case 1: return [4 /*yield*/, (0, upload_1.upload)(files, cacheName, env, keypair, elemCount, storage, retainAuthority, mutable, ipfsCredentials, awsS3Bucket)];
            case 2:
                successful = _b.sent();
                if (successful) {
                    warn = false;
                    return [3 /*break*/, 4];
                }
                else {
                    warn = true;
                    loglevel_1.default.warn('upload was not successful, rerunning');
                }
                _b.label = 3;
            case 3: return [3 /*break*/, 1];
            case 4:
                endMs = Date.now();
                timeTaken = new Date(endMs - startMs).toISOString().substr(11, 8);
                loglevel_1.default.info("ended at: " + new Date(endMs).toISOString() + ". time taken: " + timeTaken);
                if (warn) {
                    loglevel_1.default.info('not all images have been uploaded, rerun this step.');
                }
                return [2 /*return*/];
        }
    });
}); });
programCommand('verify_token_metadata')
    .argument('<directory>', 'Directory containing images and metadata files named from 0-n', function (val) {
    return fs
        .readdirSync("" + val)
        .map(function (file) { return path.join(process.cwd(), val, file); });
})
    .option('-n, --number <number>', 'Number of images to upload')
    .action(function (files, options, cmd) {
    var number = cmd.opts().number;
    var startMs = Date.now();
    loglevel_1.default.info('started at: ' + startMs.toString());
    (0, verifyTokenMetadata_1.verifyTokenMetadata)({ files: files, uploadElementsCount: number });
    var endMs = Date.now();
    var timeTaken = new Date(endMs - startMs).toISOString().substr(11, 8);
    loglevel_1.default.info("ended at: " + new Date(endMs).toString() + ". time taken: " + timeTaken);
});
programCommand('verify').action(function (directory, cmd) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, env, keypair, cacheName, cacheContent, walletKeyPair, anchorProgram, configAddress, config, allGood, keys, configData, lineCount;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = cmd.opts(), env = _a.env, keypair = _a.keypair, cacheName = _a.cacheName;
                cacheContent = (0, cache_1.loadCache)(cacheName, env);
                walletKeyPair = (0, accounts_1.loadWalletKey)(keypair);
                return [4 /*yield*/, (0, accounts_1.loadCandyProgram)(walletKeyPair, env)];
            case 1:
                anchorProgram = _b.sent();
                configAddress = new web3_js_1.PublicKey(cacheContent.program.config);
                return [4 /*yield*/, anchorProgram.provider.connection.getAccountInfo(configAddress)];
            case 2:
                config = _b.sent();
                allGood = true;
                keys = Object.keys(cacheContent.items);
                return [4 /*yield*/, Promise.all((0, various_1.chunks)(Array.from(Array(keys.length).keys()), 500).map(function (allIndexesInSlice) { return __awaiter(void 0, void 0, void 0, function () {
                        var i, key, thisSlice, name_1, uri, cacheItem, json, body, parsed, check, text;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    i = 0;
                                    _a.label = 1;
                                case 1:
                                    if (!(i < allIndexesInSlice.length)) return [3 /*break*/, 13];
                                    key = keys[allIndexesInSlice[i]];
                                    loglevel_1.default.debug('Looking at key ', allIndexesInSlice[i]);
                                    thisSlice = config.data.slice(constants_1.CONFIG_ARRAY_START + 4 + constants_1.CONFIG_LINE_SIZE * allIndexesInSlice[i], constants_1.CONFIG_ARRAY_START +
                                        4 +
                                        constants_1.CONFIG_LINE_SIZE * (allIndexesInSlice[i] + 1));
                                    name_1 = (0, various_1.fromUTF8Array)(__spreadArray([], __read(thisSlice.slice(4, 36)), false));
                                    uri = (0, various_1.fromUTF8Array)(__spreadArray([], __read(thisSlice.slice(40, 240)), false));
                                    cacheItem = cacheContent.items[key];
                                    if (!(!name_1.match(cacheItem.name) || !uri.match(cacheItem.link))) return [3 /*break*/, 2];
                                    //leaving here for debugging reasons, but it's pretty useless. if the first upload fails - all others are wrong
                                    // log.info(
                                    //   `Name (${name}) or uri (${uri}) didnt match cache values of (${cacheItem.name})` +
                                    //   `and (${cacheItem.link}). marking to rerun for image`,
                                    //   key,
                                    // );
                                    cacheItem.onChain = false;
                                    allGood = false;
                                    return [3 /*break*/, 12];
                                case 2: return [4 /*yield*/, (0, node_fetch_1.default)(cacheItem.link)];
                                case 3:
                                    json = _a.sent();
                                    if (!(json.status == 200 ||
                                        json.status == 204 ||
                                        json.status == 202)) return [3 /*break*/, 11];
                                    return [4 /*yield*/, json.text()];
                                case 4:
                                    body = _a.sent();
                                    parsed = JSON.parse(body);
                                    if (!parsed.image) return [3 /*break*/, 9];
                                    return [4 /*yield*/, (0, node_fetch_1.default)(parsed.image)];
                                case 5:
                                    check = _a.sent();
                                    if (!(check.status == 200 ||
                                        check.status == 204 ||
                                        check.status == 202)) return [3 /*break*/, 7];
                                    return [4 /*yield*/, check.text()];
                                case 6:
                                    text = _a.sent();
                                    if (!text.match(/Not found/i)) {
                                        if (text.length == 0) {
                                            loglevel_1.default.info('Name', name_1, 'with', uri, 'has zero length, failing');
                                            cacheItem.link = null;
                                            cacheItem.onChain = false;
                                            allGood = false;
                                        }
                                        else {
                                            loglevel_1.default.info('Name', name_1, 'with', uri, 'checked out');
                                        }
                                    }
                                    else {
                                        loglevel_1.default.info('Name', name_1, 'with', uri, 'never got uploaded to arweave, failing');
                                        cacheItem.link = null;
                                        cacheItem.onChain = false;
                                        allGood = false;
                                    }
                                    return [3 /*break*/, 8];
                                case 7:
                                    loglevel_1.default.info('Name', name_1, 'with', uri, 'returned non-200 from uploader', check.status);
                                    cacheItem.link = null;
                                    cacheItem.onChain = false;
                                    allGood = false;
                                    _a.label = 8;
                                case 8: return [3 /*break*/, 10];
                                case 9:
                                    loglevel_1.default.info('Name', name_1, 'with', uri, 'lacked image in json, failing');
                                    cacheItem.link = null;
                                    cacheItem.onChain = false;
                                    allGood = false;
                                    _a.label = 10;
                                case 10: return [3 /*break*/, 12];
                                case 11:
                                    loglevel_1.default.info('Name', name_1, 'with', uri, 'returned no json from link');
                                    cacheItem.link = null;
                                    cacheItem.onChain = false;
                                    allGood = false;
                                    _a.label = 12;
                                case 12:
                                    i++;
                                    return [3 /*break*/, 1];
                                case 13: return [2 /*return*/];
                            }
                        });
                    }); }))];
            case 3:
                _b.sent();
                if (!allGood) {
                    (0, cache_1.saveCache)(cacheName, env, cacheContent);
                    throw new Error("not all NFTs checked out. check out logs above for details");
                }
                return [4 /*yield*/, anchorProgram.account.config.fetch(configAddress)];
            case 4:
                configData = (_b.sent());
                lineCount = new anchor.BN(config.data.slice(247, 247 + 4), undefined, 'le');
                loglevel_1.default.info("uploaded (" + lineCount.toNumber() + ") out of (" + configData.data.maxNumberOfLines + ")");
                if (configData.data.maxNumberOfLines > lineCount.toNumber()) {
                    throw new Error("predefined number of NFTs (" + configData.data.maxNumberOfLines + ") is smaller than the uploaded one (" + lineCount.toNumber() + ")");
                }
                else {
                    loglevel_1.default.info('ready to deploy!');
                }
                (0, cache_1.saveCache)(cacheName, env, cacheContent);
                return [2 /*return*/];
        }
    });
}); });
programCommand('verify_price')
    .option('-p, --price <string>')
    .option('--cache-path <string>')
    .action(function (directory, cmd) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, keypair, env, price, cacheName, cachePath, lamports, cacheContent, walletKeyPair, anchorProgram, candyAddress, machine, candyMachineLamports;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = cmd.opts(), keypair = _a.keypair, env = _a.env, price = _a.price, cacheName = _a.cacheName, cachePath = _a.cachePath;
                lamports = (0, various_1.parsePrice)(price);
                if (isNaN(lamports)) {
                    return [2 /*return*/, loglevel_1.default.error("verify_price requires a --price to be set")];
                }
                loglevel_1.default.info("Expected price is: " + lamports);
                cacheContent = (0, cache_1.loadCache)(cacheName, env, cachePath);
                if (!cacheContent) {
                    return [2 /*return*/, loglevel_1.default.error("No cache found, can't continue. Make sure you are in the correct directory where the assets are located or use the --cache-path option.")];
                }
                walletKeyPair = (0, accounts_1.loadWalletKey)(keypair);
                return [4 /*yield*/, (0, accounts_1.loadCandyProgram)(walletKeyPair, env)];
            case 1:
                anchorProgram = _b.sent();
                candyAddress = new web3_js_1.PublicKey(cacheContent.candyMachineAddress);
                return [4 /*yield*/, anchorProgram.account.candyMachine.fetch(candyAddress)];
            case 2:
                machine = _b.sent();
                candyMachineLamports = machine.data.price.toNumber();
                loglevel_1.default.info("Candymachine price is: " + candyMachineLamports);
                if (lamports != candyMachineLamports) {
                    throw new Error("Expected price and CandyMachine's price do not match!");
                }
                loglevel_1.default.info("Good to go!");
                return [2 /*return*/];
        }
    });
}); });
programCommand('show')
    .option('--cache-path <string>')
    .action(function (directory, cmd) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, keypair, env, cacheName, cachePath, cacheContent, walletKeyPair, anchorProgram, _b, candyMachine, machine, e_1, config;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = cmd.opts(), keypair = _a.keypair, env = _a.env, cacheName = _a.cacheName, cachePath = _a.cachePath;
                cacheContent = (0, cache_1.loadCache)(cacheName, env, cachePath);
                if (!cacheContent) {
                    return [2 /*return*/, loglevel_1.default.error("No cache found, can't continue. Make sure you are in the correct directory where the assets are located or use the --cache-path option.")];
                }
                walletKeyPair = (0, accounts_1.loadWalletKey)(keypair);
                return [4 /*yield*/, (0, accounts_1.loadCandyProgram)(walletKeyPair, env)];
            case 1:
                anchorProgram = _c.sent();
                return [4 /*yield*/, (0, accounts_1.getCandyMachineAddress)(new web3_js_1.PublicKey(cacheContent.program.config), cacheContent.program.uuid)];
            case 2:
                _b = __read.apply(void 0, [_c.sent(), 1]), candyMachine = _b[0];
                _c.label = 3;
            case 3:
                _c.trys.push([3, 5, , 6]);
                return [4 /*yield*/, anchorProgram.account.candyMachine.fetch(candyMachine)];
            case 4:
                machine = _c.sent();
                loglevel_1.default.info('...Candy Machine...');
                loglevel_1.default.info('Key:', candyMachine.toBase58());
                //@ts-ignore
                loglevel_1.default.info('authority: ', machine.authority.toBase58());
                //@ts-ignore
                loglevel_1.default.info('wallet: ', machine.wallet.toBase58());
                //@ts-ignore
                loglevel_1.default.info('tokenMint: ', 
                //@ts-ignore
                machine.tokenMint ? machine.tokenMint.toBase58() : null);
                //@ts-ignore
                loglevel_1.default.info('config: ', machine.config.toBase58());
                //@ts-ignore
                loglevel_1.default.info('uuid: ', machine.data.uuid);
                //@ts-ignore
                loglevel_1.default.info('price: ', machine.data.price.toNumber());
                //@ts-ignore
                loglevel_1.default.info('itemsAvailable: ', machine.data.itemsAvailable.toNumber());
                loglevel_1.default.info('goLiveDate: ', 
                //@ts-ignore
                machine.data.goLiveDate
                    ? //@ts-ignore
                        new Date(machine.data.goLiveDate * 1000)
                    : 'N/A');
                return [3 /*break*/, 6];
            case 5:
                e_1 = _c.sent();
                console.log('No machine found');
                return [3 /*break*/, 6];
            case 6: return [4 /*yield*/, anchorProgram.account.config.fetch(cacheContent.program.config)];
            case 7:
                config = _c.sent();
                loglevel_1.default.info('...Config...');
                //@ts-ignore
                loglevel_1.default.info('authority: ', config.authority.toBase58());
                //@ts-ignore
                loglevel_1.default.info('symbol: ', config.data.symbol);
                //@ts-ignore
                loglevel_1.default.info('sellerFeeBasisPoints: ', config.data.sellerFeeBasisPoints);
                //@ts-ignore
                loglevel_1.default.info('creators: ');
                //@ts-ignore
                config.data.creators.map(function (c) {
                    return loglevel_1.default.info(c.address.toBase58(), 'at', c.share, '%');
                }),
                    //@ts-ignore
                    loglevel_1.default.info('maxSupply: ', config.data.maxSupply.toNumber());
                //@ts-ignore
                loglevel_1.default.info('retainAuthority: ', config.data.retainAuthority);
                //@ts-ignore
                loglevel_1.default.info('isMutable: ', config.data.isMutable);
                //@ts-ignore
                loglevel_1.default.info('maxNumberOfLines: ', config.data.maxNumberOfLines);
                return [2 /*return*/];
        }
    });
}); });
programCommand('create_candy_machine')
    .option('-p, --price <string>', 'Price denominated in SOL or spl-token override', '1')
    .option('-t, --spl-token <string>', 'SPL token used to price NFT mint. To use SOL leave this empty.')
    .option('-a, --spl-token-account <string>', 'SPL token account that receives mint payments. Only required if spl-token is specified.')
    .option('-s, --sol-treasury-account <string>', 'SOL account that receives mint payments.')
    .action(function (directory, cmd) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, keypair, env, price, cacheName, splToken, splTokenAccount, solTreasuryAccount, parsedPrice, cacheContent, walletKeyPair, anchorProgram, wallet, remainingAccounts, splTokenKey, splTokenAccountKey, token, mintInfo, tokenAccount, config, _b, candyMachine, bump;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = cmd.opts(), keypair = _a.keypair, env = _a.env, price = _a.price, cacheName = _a.cacheName, splToken = _a.splToken, splTokenAccount = _a.splTokenAccount, solTreasuryAccount = _a.solTreasuryAccount;
                parsedPrice = (0, various_1.parsePrice)(price);
                cacheContent = (0, cache_1.loadCache)(cacheName, env);
                walletKeyPair = (0, accounts_1.loadWalletKey)(keypair);
                return [4 /*yield*/, (0, accounts_1.loadCandyProgram)(walletKeyPair, env)];
            case 1:
                anchorProgram = _c.sent();
                wallet = walletKeyPair.publicKey;
                remainingAccounts = [];
                if (!(splToken || splTokenAccount)) return [3 /*break*/, 4];
                if (solTreasuryAccount) {
                    throw new Error('If spl-token-account or spl-token is set then sol-treasury-account cannot be set');
                }
                if (!splToken) {
                    throw new Error('If spl-token-account is set, spl-token must also be set');
                }
                splTokenKey = new web3_js_1.PublicKey(splToken);
                splTokenAccountKey = new web3_js_1.PublicKey(splTokenAccount);
                if (!splTokenAccount) {
                    throw new Error('If spl-token is set, spl-token-account must also be set');
                }
                token = new spl_token_1.Token(anchorProgram.provider.connection, splTokenKey, spl_token_1.TOKEN_PROGRAM_ID, walletKeyPair);
                return [4 /*yield*/, token.getMintInfo()];
            case 2:
                mintInfo = _c.sent();
                if (!mintInfo.isInitialized) {
                    throw new Error("The specified spl-token is not initialized");
                }
                return [4 /*yield*/, token.getAccountInfo(splTokenAccountKey)];
            case 3:
                tokenAccount = _c.sent();
                if (!tokenAccount.isInitialized) {
                    throw new Error("The specified spl-token-account is not initialized");
                }
                if (!tokenAccount.mint.equals(splTokenKey)) {
                    throw new Error("The spl-token-account's mint (" + tokenAccount.mint.toString() + ") does not match specified spl-token " + splTokenKey.toString());
                }
                wallet = splTokenAccountKey;
                parsedPrice = (0, various_1.parsePrice)(price, Math.pow(10, mintInfo.decimals));
                remainingAccounts.push({
                    pubkey: splTokenKey,
                    isWritable: false,
                    isSigner: false,
                });
                _c.label = 4;
            case 4:
                if (solTreasuryAccount) {
                    wallet = new web3_js_1.PublicKey(solTreasuryAccount);
                }
                config = new web3_js_1.PublicKey(cacheContent.program.config);
                return [4 /*yield*/, (0, accounts_1.getCandyMachineAddress)(config, cacheContent.program.uuid)];
            case 5:
                _b = __read.apply(void 0, [_c.sent(), 2]), candyMachine = _b[0], bump = _b[1];
                return [4 /*yield*/, anchorProgram.rpc.initializeCandyMachine(bump, {
                        uuid: cacheContent.program.uuid,
                        price: new anchor.BN(parsedPrice),
                        itemsAvailable: new anchor.BN(Object.keys(cacheContent.items).length),
                        goLiveDate: null,
                    }, {
                        accounts: {
                            candyMachine: candyMachine,
                            wallet: wallet,
                            config: config,
                            authority: walletKeyPair.publicKey,
                            payer: walletKeyPair.publicKey,
                            systemProgram: anchor.web3.SystemProgram.programId,
                            rent: anchor.web3.SYSVAR_RENT_PUBKEY,
                        },
                        signers: [],
                        remainingAccounts: remainingAccounts,
                    })];
            case 6:
                _c.sent();
                cacheContent.candyMachineAddress = candyMachine.toBase58();
                (0, cache_1.saveCache)(cacheName, env, cacheContent);
                loglevel_1.default.info("create_candy_machine finished. candy machine pubkey: " + candyMachine.toBase58());
                return [2 /*return*/];
        }
    });
}); });
programCommand('update_candy_machine')
    .option('-d, --date <string>', 'timestamp - eg "04 Dec 1995 00:12:00 GMT" or "now"')
    .option('-p, --price <string>', 'SOL price')
    .action(function (directory, cmd) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, keypair, env, date, price, cacheName, cacheContent, secondsSinceEpoch, lamports, walletKeyPair, anchorProgram, candyMachine, tx;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = cmd.opts(), keypair = _a.keypair, env = _a.env, date = _a.date, price = _a.price, cacheName = _a.cacheName;
                cacheContent = (0, cache_1.loadCache)(cacheName, env);
                secondsSinceEpoch = date ? (0, various_1.parseDate)(date) : null;
                lamports = price ? (0, various_1.parsePrice)(price) : null;
                walletKeyPair = (0, accounts_1.loadWalletKey)(keypair);
                return [4 /*yield*/, (0, accounts_1.loadCandyProgram)(walletKeyPair, env)];
            case 1:
                anchorProgram = _b.sent();
                candyMachine = new web3_js_1.PublicKey(cacheContent.candyMachineAddress);
                return [4 /*yield*/, anchorProgram.rpc.updateCandyMachine(lamports ? new anchor.BN(lamports) : null, secondsSinceEpoch ? new anchor.BN(secondsSinceEpoch) : null, {
                        accounts: {
                            candyMachine: candyMachine,
                            authority: walletKeyPair.publicKey,
                        },
                    })];
            case 2:
                tx = _b.sent();
                cacheContent.startDate = secondsSinceEpoch;
                (0, cache_1.saveCache)(cacheName, env, cacheContent);
                if (date)
                    loglevel_1.default.info(" - updated startDate timestamp: " + secondsSinceEpoch + " (" + date + ")");
                if (lamports)
                    loglevel_1.default.info(" - updated price: " + lamports + " lamports (" + price + " SOL)");
                loglevel_1.default.info('update_candy_machine finished', tx);
                return [2 /*return*/];
        }
    });
}); });
programCommand('mint_one_token').action(function (directory, cmd) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, keypair, env, cacheName, cacheContent, configAddress, tx;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = cmd.opts(), keypair = _a.keypair, env = _a.env, cacheName = _a.cacheName;
                cacheContent = (0, cache_1.loadCache)(cacheName, env);
                configAddress = new web3_js_1.PublicKey(cacheContent.program.config);
                return [4 /*yield*/, (0, mint_1.mint)(keypair, env, configAddress)];
            case 1:
                tx = _b.sent();
                loglevel_1.default.info('mint_one_token finished', tx);
                return [2 /*return*/];
        }
    });
}); });
programCommand('sign')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .option('-m, --metadata <string>', 'base58 metadata account id')
    .action(function (directory, cmd) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, keypair, env, metadata;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = cmd.opts(), keypair = _a.keypair, env = _a.env, metadata = _a.metadata;
                return [4 /*yield*/, (0, sign_1.signMetadata)(metadata, keypair, env)];
            case 1:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); });
programCommand('sign_all')
    .option('-b, --batch-size <string>', 'Batch size', '10')
    .option('-d, --daemon', 'Run signing continuously', false)
    .action(function (directory, cmd) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, keypair, env, cacheName, batchSize, daemon, cacheContent, walletKeyPair, anchorProgram, candyAddress, batchSizeParsed;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = cmd.opts(), keypair = _a.keypair, env = _a.env, cacheName = _a.cacheName, batchSize = _a.batchSize, daemon = _a.daemon;
                cacheContent = (0, cache_1.loadCache)(cacheName, env);
                walletKeyPair = (0, accounts_1.loadWalletKey)(keypair);
                return [4 /*yield*/, (0, accounts_1.loadCandyProgram)(walletKeyPair, env)];
            case 1:
                anchorProgram = _b.sent();
                candyAddress = cacheContent.candyMachineAddress;
                batchSizeParsed = parseInt(batchSize);
                if (!parseInt(batchSize)) {
                    throw new Error('Batch size needs to be an integer!');
                }
                loglevel_1.default.debug('Creator pubkey: ', walletKeyPair.publicKey.toBase58());
                loglevel_1.default.debug('Environment: ', env);
                loglevel_1.default.debug('Candy machine address: ', candyAddress);
                loglevel_1.default.debug('Batch Size: ', batchSizeParsed);
                return [4 /*yield*/, (0, signAll_1.signAllMetadataFromCandyMachine)(anchorProgram.provider.connection, walletKeyPair, candyAddress, batchSizeParsed, daemon)];
            case 2:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); });
programCommand('generate_art_configurations')
    .argument('<directory>', 'Directory containing traits named from 0-n', function (val) {
    return fs.readdirSync("" + val);
})
    .action(function (files) { return __awaiter(void 0, void 0, void 0, function () {
    var startMs, successful, endMs, timeTaken;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                loglevel_1.default.info('creating traits configuration file');
                startMs = Date.now();
                return [4 /*yield*/, (0, generateConfigurations_1.generateConfigurations)(files)];
            case 1:
                successful = _a.sent();
                endMs = Date.now();
                timeTaken = new Date(endMs - startMs).toISOString().substr(11, 8);
                if (successful) {
                    loglevel_1.default.info('traits-configuration.json has been created!');
                    loglevel_1.default.info("ended at: " + new Date(endMs).toISOString() + ". time taken: " + timeTaken);
                }
                else {
                    loglevel_1.default.info('The art configuration file was not created');
                }
                return [2 /*return*/];
        }
    });
}); });
programCommand('create_generative_art')
    .option('-n, --number-of-images <string>', 'Number of images to be generated', '100')
    .option('-c, --config-location <string>', 'Location of the traits configuration file', './traits-configuration.json')
    .action(function (directory, cmd) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, numberOfImages, configLocation, randomSets;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = cmd.opts(), numberOfImages = _a.numberOfImages, configLocation = _a.configLocation;
                loglevel_1.default.info('Loaded configuration file');
                return [4 /*yield*/, (0, metadata_1.createMetadataFiles)(numberOfImages, configLocation)];
            case 1:
                randomSets = _b.sent();
                loglevel_1.default.info('JSON files have been created within the assets directory');
                // 2. piecemeal generate the images
                return [4 /*yield*/, (0, createArt_1.createGenerativeArt)(configLocation, randomSets)];
            case 2:
                // 2. piecemeal generate the images
                _b.sent();
                loglevel_1.default.info('Images have been created successfully!');
                return [2 /*return*/];
        }
    });
}); });
function programCommand(name) {
    return commander_1.program
        .command(name)
        .option('-e, --env <string>', 'Solana cluster env name', 'devnet')
        .option('-k, --keypair <path>', "Solana wallet location", '--keypair not provided')
        .option('-l, --log-level <string>', 'log level', setLogLevel)
        .option('-c, --cache-name <string>', 'Cache file name', 'temp');
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function setLogLevel(value, prev) {
    if (value === undefined || value === null) {
        return;
    }
    loglevel_1.default.info('setting the log value to: ' + value);
    loglevel_1.default.setLevel(value);
}
commander_1.program.parse(process.argv);
