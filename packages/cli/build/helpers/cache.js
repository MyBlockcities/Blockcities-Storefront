"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveCache = exports.loadCache = exports.cachePath = void 0;
var path_1 = __importDefault(require("path"));
var constants_1 = require("./constants");
var fs_1 = __importDefault(require("fs"));
function cachePath(env, cacheName, cPath) {
    if (cPath === void 0) { cPath = constants_1.CACHE_PATH; }
    return path_1.default.join(cPath, env + "-" + cacheName);
}
exports.cachePath = cachePath;
function loadCache(cacheName, env, cPath) {
    if (cPath === void 0) { cPath = constants_1.CACHE_PATH; }
    var path = cachePath(env, cacheName, cPath);
    return fs_1.default.existsSync(path)
        ? JSON.parse(fs_1.default.readFileSync(path).toString())
        : undefined;
}
exports.loadCache = loadCache;
function saveCache(cacheName, env, cacheContent, cPath) {
    if (cPath === void 0) { cPath = constants_1.CACHE_PATH; }
    cacheContent.env = env;
    cacheContent.cacheName = cacheName;
    fs_1.default.writeFileSync(cachePath(env, cacheName, cPath), JSON.stringify(cacheContent));
}
exports.saveCache = saveCache;
