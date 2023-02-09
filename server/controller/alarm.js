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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notifyAlarm = exports.deleteAlarm = exports.renderAlarm = exports.createAlarm = void 0;
const index_js_1 = require("../models/index.js");
const alarm_js_1 = __importDefault(require("../models/alarm.js"));
const sequelize_1 = require("sequelize");
const createAlarm = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const UserId = req.user.id;
        const newAlarm = yield alarm_js_1.default.create({
            alarmName: req.body.alarmName,
            time: req.body.date,
            UserId: UserId,
        });
        res.status(201).end();
        // 생성 성공 Status 201
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.createAlarm = createAlarm;
const renderAlarm = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const UserId = req.user.id;
        const renderAlarm = yield alarm_js_1.default.findAll({
            where: { UserId },
        });
        if (!renderAlarm) {
            return res.end();
        }
        else {
            res.status(200);
            res.json(renderAlarm);
            // 아이템 가져오기 성공 Status 200
        }
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.renderAlarm = renderAlarm;
const deleteAlarm = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const d_id = req.body.id;
        const deleteAlarm = yield alarm_js_1.default.destroy({ where: { id: d_id } });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
    res.status(200).end();
    // 삭제 성공 status 200
});
exports.deleteAlarm = deleteAlarm;
const notifyAlarm = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const UserId = req.user.id;
        const query = `SELECT * FROM alarms WHERE UserId = ${UserId} AND time <= now()`;
        const nofityAlarm = yield index_js_1.sequelize.query(query, {
            type: sequelize_1.QueryTypes.SELECT,
            raw: true,
        });
        if (!nofityAlarm) {
            return res.end();
        }
        else {
            res.status(200);
            res.json(nofityAlarm);
            // 아이템 가져오기 성공 Status 200
        }
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.notifyAlarm = notifyAlarm;
