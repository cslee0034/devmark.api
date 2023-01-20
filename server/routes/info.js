"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.info = void 0;
const express_1 = __importDefault(require("express"));
exports.info = express_1.default.Router();
exports.info.get("/", (req, res) => {
    const userId = res.locals.user;
    res.send(userId);
});
