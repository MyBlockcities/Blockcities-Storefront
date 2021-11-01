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
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var loglevel_1 = __importDefault(require("loglevel"));
var mint_nft_1 = require("./commands/mint-nft");
var accounts_1 = require("./helpers/accounts");
var anchor_1 = require("@project-serum/anchor");
var web3_js_1 = require("@solana/web3.js");
commander_1.program.version('0.0.1');
loglevel_1.default.setLevel('info');
programCommand('mint')
    .option('-u, --url <string>', 'metadata url')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .action(function (directory, cmd) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, keypair, env, url, solConnection, walletKeyPair;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = cmd.opts(), keypair = _a.keypair, env = _a.env, url = _a.url;
                solConnection = new anchor_1.web3.Connection(anchor_1.web3.clusterApiUrl(env));
                walletKeyPair = (0, accounts_1.loadWalletKey)(keypair);
                return [4 /*yield*/, (0, mint_nft_1.mintNFT)(solConnection, walletKeyPair, url)];
            case 1:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); });
programCommand('update-metadata')
    .option('-m, --mint <string>', 'base58 mint key')
    .option('-u, --url <string>', 'metadata url')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .action(function (directory, cmd) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, keypair, env, mint, url, mintKey, solConnection, walletKeyPair;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = cmd.opts(), keypair = _a.keypair, env = _a.env, mint = _a.mint, url = _a.url;
                mintKey = new web3_js_1.PublicKey(mint);
                solConnection = new anchor_1.web3.Connection(anchor_1.web3.clusterApiUrl(env));
                walletKeyPair = (0, accounts_1.loadWalletKey)(keypair);
                return [4 /*yield*/, (0, mint_nft_1.updateMetadata)(mintKey, solConnection, walletKeyPair, url)];
            case 1:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); });
function programCommand(name) {
    return commander_1.program
        .command(name)
        .option('-e, --env <string>', 'Solana cluster env name', 'devnet')
        .option('-k, --keypair <path>', "Solana wallet location", '--keypair not provided')
        .option('-l, --log-level <string>', 'log level', setLogLevel);
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
