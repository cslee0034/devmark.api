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
exports.createMemo = void 0;
const memo_js_1 = __importDefault(require("../models/memo.js"));
const createMemo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newMemo = yield memo_js_1.default.create({
            memoName: req.body.memoName,
            memoContent: req.body.memoContent,
            BookmarkId: req.body.bookmarkId,
        });
        res.status(200).end();
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.createMemo = createMemo;
// const renderContent: RequestHandler = async (req, res, next) => {
//   try {
//     if (req.query!.boxId) {
//       const boxId = parseInt(req.query!.boxId as unknown as string);
//       const memos = await memo.findAll({ where: { BoxId: boxId } });
//       if (!Bookmarks) {
//         return res.end();
//       } else {
//         res.json(Bookmarks);
//       }
//     } else {
//       return;
//     }
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// };
// const updateContent: RequestHandler = async (req, res, next) => {
//   try {
//     const Bookmark = await bookmark.update(
//       {
//         contentName: req.body.bookmarkName,
//         URL: req.body.bookmarkURL,
//       },
//       {
//         where: { id: req.body.id },
//       }
//     );
//     res.redirect("/");
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
//   next();
// };
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
});
