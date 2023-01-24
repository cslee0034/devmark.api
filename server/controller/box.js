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
exports.createBox = exports.imgUpload = void 0;
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
        const box = yield box_js_1.default.create({
            box: req.body.box,
            img: req.body.url,
            UserId: req.body.userId
        });
        res.redirect("/");
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.createBox = createBox;
