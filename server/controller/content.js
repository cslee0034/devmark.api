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
exports.updateContent = exports.deleteContent = exports.renderContent = exports.createContent = void 0;
const bookmark_1 = __importDefault(require("../models/bookmark"));
const createContent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const box = yield bookmark_1.default.create({
            contentName: req.body.bookmarkName,
            URL: req.body.bookmarkURL,
            BoxId: req.body.boxId,
        });
        res.redirect("/");
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.createContent = createContent;
const renderContent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.query.boxId) {
            const boxId = parseInt(req.query.boxId);
            const Bookmarks = yield bookmark_1.default.findAll({ where: { BoxId: boxId } });
            if (!Bookmarks) {
                return res.end();
            }
            else {
                res.json(Bookmarks);
            }
        }
        else {
            return;
        }
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.renderContent = renderContent;
const updateContent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("hihihi", req.body);
    try {
        const Bookmark = yield bookmark_1.default.update({
            contentName: req.body.bookmarkName,
            URL: req.body.bookmarkURL,
        }, {
            where: { id: req.body.id },
        });
        res.redirect("/");
    }
    catch (error) {
        console.error(error);
        next(error);
    }
    next();
});
exports.updateContent = updateContent;
const deleteContent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const d_id = req.body.id;
        const box = yield bookmark_1.default.destroy({ where: { id: d_id } });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
    next();
});
exports.deleteContent = deleteContent;
