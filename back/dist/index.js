"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = exports.createApp = void 0;
var app_1 = require("./app");
Object.defineProperty(exports, "createApp", { enumerable: true, get: function () { return app_1.createApp; } });
var index_1 = require("./routes/index");
Object.defineProperty(exports, "router", { enumerable: true, get: function () { return __importDefault(index_1).default; } });
require("./server");
//# sourceMappingURL=index.js.map