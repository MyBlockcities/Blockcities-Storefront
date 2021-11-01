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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMetadata = exports.mintNFT = exports.createMetadata = void 0;
var instructions_1 = require("../helpers/instructions");
var transactions_1 = require("../helpers/transactions");
var accounts_1 = require("../helpers/accounts");
var anchor = __importStar(require("@project-serum/anchor"));
var schema_1 = require("../helpers/schema");
var borsh_1 = require("borsh");
var constants_1 = require("../helpers/constants");
var node_fetch_1 = __importDefault(require("node-fetch"));
var spl_token_1 = require("@solana/spl-token");
var web3_js_1 = require("@solana/web3.js");
var loglevel_1 = __importDefault(require("loglevel"));
var createMetadata = function (metadataLink) { return __awaiter(void 0, void 0, void 0, function () {
    var metadata, e_1, metaCreators, creators;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, (0, node_fetch_1.default)(metadataLink, { method: 'GET' })];
            case 1: return [4 /*yield*/, (_a.sent()).json()];
            case 2:
                metadata = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                loglevel_1.default.debug(e_1);
                loglevel_1.default.error('Invalid metadata at', metadataLink);
                return [2 /*return*/];
            case 4:
                // Validate metadata
                if (!metadata.name ||
                    !metadata.image ||
                    isNaN(metadata.seller_fee_basis_points) ||
                    !metadata.properties ||
                    !Array.isArray(metadata.properties.creators)) {
                    loglevel_1.default.error('Invalid metadata file', metadata);
                    return [2 /*return*/];
                }
                metaCreators = metadata.properties.creators;
                if (metaCreators.some(function (creator) { return !creator.address; }) ||
                    metaCreators.reduce(function (sum, creator) { return creator.share + sum; }, 0) !== 100) {
                    return [2 /*return*/];
                }
                creators = metaCreators.map(function (creator) {
                    return new schema_1.Creator({
                        address: creator.address,
                        share: creator.share,
                        verified: 1,
                    });
                });
                return [2 /*return*/, new schema_1.Data({
                        symbol: metadata.symbol,
                        name: metadata.name,
                        uri: metadataLink,
                        sellerFeeBasisPoints: metadata.seller_fee_basis_points,
                        creators: creators,
                    })];
        }
    });
}); };
exports.createMetadata = createMetadata;
var mintNFT = function (connection, walletKeypair, metadataLink, mutableMetadata) {
    if (mutableMetadata === void 0) { mutableMetadata = true; }
    return __awaiter(void 0, void 0, void 0, function () {
        var data, wallet, mintRent, mint, instructions, signers, userTokenAccoutAddress, metadataAccount, txnData, editionAccount, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, exports.createMetadata)(metadataLink)];
                case 1:
                    data = _b.sent();
                    if (!data)
                        return [2 /*return*/];
                    wallet = new anchor.Wallet(walletKeypair);
                    if (!(wallet === null || wallet === void 0 ? void 0 : wallet.publicKey))
                        return [2 /*return*/];
                    return [4 /*yield*/, connection.getMinimumBalanceForRentExemption(spl_token_1.MintLayout.span)];
                case 2:
                    mintRent = _b.sent();
                    mint = anchor.web3.Keypair.generate();
                    instructions = [];
                    signers = [mint, walletKeypair];
                    instructions.push(web3_js_1.SystemProgram.createAccount({
                        fromPubkey: wallet.publicKey,
                        newAccountPubkey: mint.publicKey,
                        lamports: mintRent,
                        space: spl_token_1.MintLayout.span,
                        programId: constants_1.TOKEN_PROGRAM_ID,
                    }));
                    instructions.push(spl_token_1.Token.createInitMintInstruction(constants_1.TOKEN_PROGRAM_ID, mint.publicKey, 0, wallet.publicKey, wallet.publicKey));
                    return [4 /*yield*/, (0, accounts_1.getTokenWallet)(wallet.publicKey, mint.publicKey)];
                case 3:
                    userTokenAccoutAddress = _b.sent();
                    instructions.push((0, instructions_1.createAssociatedTokenAccountInstruction)(userTokenAccoutAddress, wallet.publicKey, wallet.publicKey, mint.publicKey));
                    return [4 /*yield*/, (0, accounts_1.getMetadata)(mint.publicKey)];
                case 4:
                    metadataAccount = _b.sent();
                    txnData = Buffer.from((0, borsh_1.serialize)(schema_1.METADATA_SCHEMA, new schema_1.CreateMetadataArgs({ data: data, isMutable: mutableMetadata })));
                    instructions.push((0, instructions_1.createMetadataInstruction)(metadataAccount, mint.publicKey, wallet.publicKey, wallet.publicKey, wallet.publicKey, txnData));
                    instructions.push(spl_token_1.Token.createMintToInstruction(constants_1.TOKEN_PROGRAM_ID, mint.publicKey, userTokenAccoutAddress, wallet.publicKey, [], 1));
                    return [4 /*yield*/, (0, accounts_1.getMasterEdition)(mint.publicKey)];
                case 5:
                    editionAccount = _b.sent();
                    txnData = Buffer.from((0, borsh_1.serialize)(schema_1.METADATA_SCHEMA, new schema_1.CreateMasterEditionArgs({ maxSupply: new anchor.BN(0) })));
                    instructions.push((0, instructions_1.createMasterEditionInstruction)(metadataAccount, editionAccount, mint.publicKey, wallet.publicKey, wallet.publicKey, wallet.publicKey, txnData));
                    return [4 /*yield*/, (0, transactions_1.sendTransactionWithRetryWithKeypair)(connection, walletKeypair, instructions, signers)];
                case 6:
                    res = _b.sent();
                    _b.label = 7;
                case 7:
                    _b.trys.push([7, 9, , 10]);
                    return [4 /*yield*/, connection.confirmTransaction(res.txid, 'max')];
                case 8:
                    _b.sent();
                    return [3 /*break*/, 10];
                case 9:
                    _a = _b.sent();
                    return [3 /*break*/, 10];
                case 10: 
                // Force wait for max confirmations
                return [4 /*yield*/, connection.getParsedConfirmedTransaction(res.txid, 'confirmed')];
                case 11:
                    // Force wait for max confirmations
                    _b.sent();
                    loglevel_1.default.info('NFT created', res.txid);
                    return [2 /*return*/, metadataAccount];
            }
        });
    });
};
exports.mintNFT = mintNFT;
var updateMetadata = function (mintKey, connection, walletKeypair, metadataLink) { return __awaiter(void 0, void 0, void 0, function () {
    var data, metadataAccount, signers, value, txnData, instructions, txid;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.createMetadata)(metadataLink)];
            case 1:
                data = _a.sent();
                if (!data)
                    return [2 /*return*/];
                return [4 /*yield*/, (0, accounts_1.getMetadata)(mintKey)];
            case 2:
                metadataAccount = _a.sent();
                signers = [];
                value = new schema_1.UpdateMetadataArgs({
                    data: data,
                    updateAuthority: walletKeypair.publicKey.toBase58(),
                    primarySaleHappened: null,
                });
                txnData = Buffer.from((0, borsh_1.serialize)(schema_1.METADATA_SCHEMA, value));
                instructions = [
                    (0, instructions_1.createUpdateMetadataInstruction)(metadataAccount, walletKeypair.publicKey, txnData),
                ];
                return [4 /*yield*/, (0, transactions_1.sendTransactionWithRetryWithKeypair)(connection, walletKeypair, instructions, signers)];
            case 3:
                txid = _a.sent();
                console.log('Metadata updated', txid);
                return [2 /*return*/, metadataAccount];
        }
    });
}); };
exports.updateMetadata = updateMetadata;
