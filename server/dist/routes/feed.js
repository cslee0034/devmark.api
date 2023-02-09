"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.feed = void 0;
const express_1 = __importDefault(require("express"));
const feed_js_1 = require("../controller/feed.js");
const middleware_js_1 = require("../middleware/middleware.js");
exports.feed = express_1.default.Router();
/* Post /api/content */
exports.feed.post("/", middleware_js_1.isLoggedIn, feed_js_1.createFeed, feed_js_1.scrapOg, feed_js_1.updateImg);
/* Get /api/content */
exports.feed.get("/", middleware_js_1.isLoggedIn, feed_js_1.renderFeeds);
/* Delete /api/content */
exports.feed.delete("/", middleware_js_1.isLoggedIn, feed_js_1.deleteFeed);
