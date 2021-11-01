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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.arweaveUpload = void 0;
var anchor = __importStar(require("@project-serum/anchor"));
var form_data_1 = __importDefault(require("form-data"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var loglevel_1 = __importDefault(require("loglevel"));
var node_fetch_1 = __importDefault(require("node-fetch"));
var promises_1 = require("fs/promises");
var arweave_cost_1 = require("@metaplex/arweave-cost");
var constants_1 = require("../constants");
var transactions_1 = require("../transactions");
var ARWEAVE_UPLOAD_ENDPOINT = 'https://us-central1-metaplex-studios.cloudfunctions.net/uploadFile';
function fetchAssetCostToStore(fileSizes) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, arweave_cost_1.calculate)(fileSizes)];
                case 1:
                    result = _a.sent();
                    loglevel_1.default.debug('Arweave cost estimates:', result);
                    return [2 /*return*/, result.solana * anchor.web3.LAMPORTS_PER_SOL];
            }
        });
    });
}
function upload(data, manifest, index) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    loglevel_1.default.debug("trying to upload " + index + ".png: " + manifest.name);
                    return [4 /*yield*/, (0, node_fetch_1.default)(ARWEAVE_UPLOAD_ENDPOINT, {
                            method: 'POST',
                            // @ts-ignore
                            body: data,
                        })];
                case 1: return [4 /*yield*/, (_a.sent()).json()];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function estimateManifestSize(filenames) {
    var e_1, _a;
    var paths = {};
    try {
        for (var filenames_1 = __values(filenames), filenames_1_1 = filenames_1.next(); !filenames_1_1.done; filenames_1_1 = filenames_1.next()) {
            var name_1 = filenames_1_1.value;
            paths[name_1] = {
                id: 'artestaC_testsEaEmAGFtestEGtestmMGmgMGAV438',
                ext: path_1.default.extname(name_1).replace('.', ''),
            };
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (filenames_1_1 && !filenames_1_1.done && (_a = filenames_1.return)) _a.call(filenames_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    var manifest = {
        manifest: 'arweave/paths',
        version: '0.1.0',
        paths: paths,
        index: {
            path: 'metadata.json',
        },
    };
    var data = Buffer.from(JSON.stringify(manifest), 'utf8');
    loglevel_1.default.debug('Estimated manifest size:', data.length);
    return data.length;
}
function arweaveUpload(walletKeyPair, anchorProgram, env, image, manifestBuffer, // TODO rename metadataBuffer
manifest, // TODO rename metadata
index) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var fsStat, estimatedManifestSize, storageCost, instructions, tx, data, result, metadataFile, link;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, promises_1.stat)(image)];
                case 1:
                    fsStat = _b.sent();
                    estimatedManifestSize = estimateManifestSize([
                        'image.png',
                        'metadata.json',
                    ]);
                    return [4 /*yield*/, fetchAssetCostToStore([
                            fsStat.size,
                            manifestBuffer.length,
                            estimatedManifestSize,
                        ])];
                case 2:
                    storageCost = _b.sent();
                    console.log("lamport cost to store " + image + ": " + storageCost);
                    instructions = [
                        anchor.web3.SystemProgram.transfer({
                            fromPubkey: walletKeyPair.publicKey,
                            toPubkey: constants_1.ARWEAVE_PAYMENT_WALLET,
                            lamports: storageCost,
                        }),
                    ];
                    return [4 /*yield*/, (0, transactions_1.sendTransactionWithRetryWithKeypair)(anchorProgram.provider.connection, walletKeyPair, instructions, [], 'confirmed')];
                case 3:
                    tx = _b.sent();
                    loglevel_1.default.debug("solana transaction (" + env + ") for arweave payment:", tx);
                    data = new form_data_1.default();
                    data.append('transaction', tx['txid']);
                    data.append('env', env);
                    data.append('file[]', fs_1.default.createReadStream(image), {
                        filename: "image.png",
                        contentType: 'image/png',
                    });
                    data.append('file[]', manifestBuffer, 'metadata.json');
                    return [4 /*yield*/, upload(data, manifest, index)];
                case 4:
                    result = _b.sent();
                    metadataFile = (_a = result.messages) === null || _a === void 0 ? void 0 : _a.find(function (m) { return m.filename === 'manifest.json'; });
                    if (metadataFile === null || metadataFile === void 0 ? void 0 : metadataFile.transactionId) {
                        link = "https://arweave.net/" + metadataFile.transactionId;
                        loglevel_1.default.debug("File uploaded: " + link);
                        return [2 /*return*/, link];
                    }
                    else {
                        // @todo improve
                        throw new Error("No transaction ID for upload: " + index);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.arweaveUpload = arweaveUpload;
