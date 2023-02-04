"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.alarm = void 0;
const express_1 = __importDefault(require("express"));
const alarm_js_1 = require("../controller/alarm.js");
const middleware_js_1 = require("../middleware/middleware.js");
exports.alarm = express_1.default.Router();
/* Post /api/content */
exports.alarm.post("/", middleware_js_1.isLoggedIn, alarm_js_1.createAlarm);
/* Get /api/content */
exports.alarm.get("/", middleware_js_1.isLoggedIn, alarm_js_1.renderAlarm);
/* Delete /api/content */
exports.alarm.delete("/", middleware_js_1.isLoggedIn, alarm_js_1.deleteAlarm);
