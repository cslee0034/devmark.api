"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const express_1 = __importDefault(require("express"));
exports.api = express_1.default.Router();
/* Import route */
const info_js_1 = require("./info.js");
const user_js_1 = require("./user.js");
const box_js_1 = require("./box.js");
const content_js_1 = require("./content.js");
const memo_js_1 = require("./memo.js");
const alarm_js_1 = require("./alarm.js");
const feed_js_1 = require("./feed.js");
exports.api.use("/info", info_js_1.info);
exports.api.use("/user", user_js_1.user);
exports.api.use("/box", box_js_1.box);
exports.api.use("/content", content_js_1.content);
exports.api.use("/memo", memo_js_1.memo);
exports.api.use("/alarm", alarm_js_1.alarm);
exports.api.use("/feed", feed_js_1.feed);
