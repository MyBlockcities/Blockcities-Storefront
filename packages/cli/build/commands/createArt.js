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
exports.createGenerativeArt = void 0;
var fs_1 = __importDefault(require("fs"));
var canvas_1 = __importDefault(require("canvas"));
var imagemin_1 = __importDefault(require("imagemin"));
var imagemin_pngquant_1 = __importDefault(require("imagemin-pngquant"));
var loglevel_1 = __importDefault(require("loglevel"));
var various_1 = require("../helpers/various");
var metadata_1 = require("../helpers/metadata");
var createCanvas = canvas_1.default.createCanvas, loadImage = canvas_1.default.loadImage;
var createImage = function (order, image, width, height) {
    if (order === void 0) { order = []; }
    return __awaiter(void 0, void 0, void 0, function () {
        var canvas, context, ID, buffer, optimizedImage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    canvas = createCanvas(width, height);
                    context = canvas.getContext('2d');
                    ID = parseInt(image.id, 10) - 1;
                    return [4 /*yield*/, Promise.all(order.map(function (cur) { return __awaiter(void 0, void 0, void 0, function () {
                            var imageLocation, loadedImage;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        imageLocation = metadata_1.TRAITS_DIRECTORY + "/" + cur + "/" + image[cur];
                                        return [4 /*yield*/, loadImage(imageLocation)];
                                    case 1:
                                        loadedImage = _a.sent();
                                        context.patternQuality = 'best';
                                        context.quality = 'best';
                                        context.drawImage(loadedImage, 0, 0, width, height);
                                        return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 1:
                    _a.sent();
                    buffer = canvas.toBuffer('image/png');
                    return [4 /*yield*/, imagemin_1.default.buffer(buffer, {
                            plugins: [
                                (0, imagemin_pngquant_1.default)({
                                    quality: [0.6, 0.95],
                                }),
                            ],
                        })];
                case 2:
                    optimizedImage = _a.sent();
                    loglevel_1.default.info("Placed " + ID + ".png into the " + metadata_1.ASSETS_DIRECTORY);
                    fs_1.default.writeFileSync(metadata_1.ASSETS_DIRECTORY + "/" + ID + ".png", optimizedImage);
                    return [2 /*return*/];
            }
        });
    });
};
function createGenerativeArt(configLocation, randomizedSets) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, order, width, height, PROCESSING_LENGTH, processImage;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, various_1.readJsonFile)(configLocation)];
                case 1:
                    _a = _b.sent(), order = _a.order, width = _a.width, height = _a.height;
                    PROCESSING_LENGTH = 10;
                    processImage = function (marker) {
                        if (marker === void 0) { marker = 0; }
                        return __awaiter(_this, void 0, void 0, function () {
                            var slice;
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        slice = randomizedSets.slice(marker, marker + PROCESSING_LENGTH + 1);
                                        // generate images for the portion
                                        return [4 /*yield*/, Promise.all(slice.map(function (image) { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0: return [4 /*yield*/, createImage(order, image, width, height)];
                                                        case 1:
                                                            _a.sent();
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            }); }))];
                                    case 1:
                                        // generate images for the portion
                                        _a.sent();
                                        marker += PROCESSING_LENGTH;
                                        return [4 /*yield*/, (0, various_1.sleep)(1000)];
                                    case 2:
                                        _a.sent();
                                        if (marker < randomizedSets.length - 1) {
                                            processImage(marker);
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        });
                    };
                    // recurse until completion
                    processImage();
                    return [2 /*return*/];
            }
        });
    });
}
exports.createGenerativeArt = createGenerativeArt;
