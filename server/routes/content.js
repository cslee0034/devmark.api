"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.content = void 0;
const express_1 = __importDefault(require("express"));
const content_js_1 = require("../controller/content.js");
const middleware_js_1 = require("../middleware/middleware.js");
exports.content = express_1.default.Router();
/* Post /api/content */
exports.content.post("/", middleware_js_1.isLoggedIn, content_js_1.createContent);
/* Get /api/content */
exports.content.get("/", middleware_js_1.isLoggedIn, content_js_1.renderContent);
/* Patch /api/content */
exports.content.patch("/", middleware_js_1.isLoggedIn, content_js_1.updateContent);
/* Delete /api/content */
exports.content.delete("/", middleware_js_1.isLoggedIn, content_js_1.deleteContent);
