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
exports.findUserBox = void 0;
const box_1 = __importDefault(require("../models/box"));
const findUserBox = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const boxId = req.query.boxId;
    try {
        const box = yield box_1.default.findAll({ where: { UserId: userId } });
        // Box가 없어서 빈 배열로 온다면 끝낸다.
        if (box.length === 0) {
            res.status(200);
            res.end();
        }
        // Box를 검사하며 id가 일치하는 Bbox가 있다면 break
        // 없다면 끝낸다.
        for (let i = 0; i < box.length; i++) {
            if (box[i].dataValues.id == boxId) {
                break;
            }
            else {
                res.end();
            }
        }
    }
    catch (error) {
        console.error(error);
        next(error);
    }
    next();
});
exports.findUserBox = findUserBox;
