"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.memo = void 0;
const express_1 = __importDefault(require("express"));
const memo_js_1 = require("../controller/memo.js");
const middleware_js_1 = require("../middleware/middleware.js");
exports.memo = express_1.default.Router();
/* Post /api/memo */
exports.memo.post("/", middleware_js_1.isLoggedIn, memo_js_1.createMemo);
// /* Get /api/memo */
exports.memo.get("/", middleware_js_1.isLoggedIn, memo_js_1.renderMemo);
// /* Get /api/memo/each */
exports.memo.get("/each", middleware_js_1.isLoggedIn, memo_js_1.renderMemoEach);
// /* Patch /api/memo */
// // memo.patch("/", isLoggedIn, updateMemo);
// /* Delete /api/memo */
exports.memo.delete("/", middleware_js_1.isLoggedIn, memo_js_1.deleteMemo);
