"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const express_1 = __importDefault(require("express"));
const middleware_js_1 = require("../middleware/middleware.js");
const auth_js_1 = require("../controller/auth.js");
exports.user = express_1.default.Router();
/* Post /auth/api/user/registration */
exports.user.post("/registration", middleware_js_1.isNotLoggedIn, auth_js_1.registration);
/* Post /auth/api/user/login */
exports.user.post("/login", middleware_js_1.isNotLoggedIn, auth_js_1.login);
exports.user.post('/logout', middleware_js_1.isLoggedIn, auth_js_1.logout);
