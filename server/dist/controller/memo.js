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
exports.deleteMemo = exports.updateMemo = exports.renderMemoEach = exports.renderMemo = exports.createMemo = void 0;
const sequelize_1 = require("sequelize");
const index_js_1 = require("../models/index.js");
const memo_js_1 = __importDefault(require("../models/memo.js"));
const createMemo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newMemo = yield memo_js_1.default.create({
            memoName: req.body.memoName,
            memoContent: req.body.memoContent,
            BookmarkId: req.body.bookmarkId,
        });
        res.status(201).end();
        // 생성 성공 Status 201
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.createMemo = createMemo;
const renderMemo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const UserId = req.user.id;
        const query = `SELECT b.contentName, m.memoName, m.id FROM bookmarks b, memos m, boxs x WHERE b.id = m.BookmarkId AND b.BoxId = x.id AND x.UserId = ${UserId} ORDER BY b.contentName ASC`;
        const memos = yield index_js_1.sequelize.query(query, {
            type: sequelize_1.QueryTypes.SELECT,
            raw: true,
        });
        if (!memos) {
            return res.end();
        }
        else {
            res.status(200).json(memos);
        }
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.renderMemo = renderMemo;
const renderMemoEach = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.query.memoId);
        const memos = yield memo_js_1.default.findOne({ where: { id } });
        if (!memos) {
            return res.end();
        }
        else {
            res.status(200).json(memos);
        }
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.renderMemoEach = renderMemoEach;
const updateMemo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Memos = yield memo_js_1.default.update({
            memoName: req.body.memoName,
            memoContent: req.body.memoContent,
        }, {
            where: { id: req.body.id },
        });
        res.status(200).end();
    }
    catch (error) {
        console.error(error);
        next(error);
    }
    next();
});
exports.updateMemo = updateMemo;
const deleteMemo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const d_id = req.body.id;
        const deleteMemo = yield memo_js_1.default.destroy({ where: { id: d_id } });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
    res.status(200).end();
    // 삭제 성공 Status 200
});
exports.deleteMemo = deleteMemo;
