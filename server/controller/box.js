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
exports.deleteBox = exports.updateBox = exports.imgDelete = exports.renderBox = exports.createBox = exports.imgUpload = void 0;
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const box_js_1 = __importDefault(require("../models/box.js"));
const imgUpload = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination(req, file, cb) {
            cb(null, "uploads/");
            // upload to uploads folder
        },
        filename(req, file, cb) {
            const ext = path_1.default.extname(file.originalname);
            cb(null, path_1.default.basename(file.originalname, ext) + Date.now() + ext);
            // add file date
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});
exports.imgUpload = imgUpload;
const createBox = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newBox = yield box_js_1.default.create({
            box: req.body.box,
            img: req.body.url,
            UserId: req.user.id,
        });
        res.status(201).end();
        // 아이템 생성 성공 Status 201
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.createBox = createBox;
/* Render */
const renderBox = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const UserId = req.user.id;
        const renderBoxs = yield box_js_1.default.findAll({ where: { UserId } });
        if (!renderBoxs) {
            return res.end();
        }
        else {
            res.status(200);
            res.json(renderBoxs);
            // 아이템 가져오기 성공 Status 200
        }
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.renderBox = renderBox;
const imgDelete = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.d_url === "/img/default") {
        /* default 이미지라면 지우지 않는다 */
        next();
    }
    if (req.body.d_url) {
        let url = req.body.d_url;
        /* 파일 경로 재지정 */
        url = url.replace("/img/", "./uploads/");
        try {
            fs_1.default.unlinkSync(url);
        }
        catch (error) {
            console.error(error);
            next(error);
        }
    }
    // 가장 마지막에 이미지를 지우기 때문에
    // status 200을 보내고 종료
    res.status(200).end();
});
exports.imgDelete = imgDelete;
const updateBox = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateBox = yield box_js_1.default.update({
            box: req.body.box,
            img: req.body.url,
        }, {
            where: { id: req.body.id },
        });
        if (updateBox) {
            res.status(200);
            // 수정 성공 Status
        }
    }
    catch (error) {
        console.error(error);
        next(error);
    }
    next();
});
exports.updateBox = updateBox;
const deleteBox = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const d_id = req.body.id;
        const deleteBox = yield box_js_1.default.destroy({ where: { id: d_id } });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
    next();
});
exports.deleteBox = deleteBox;
