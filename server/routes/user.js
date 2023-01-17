var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import bcrypt from "bcrypt";
import { isNotLoggedIn } from "./middleware.js";
import User from "../models/user.js";
// const passport = require("passport");
export const user = express.Router();
user.post("/registration", isNotLoggedIn, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, nick, password } = req.body;
    try {
        const exUser = yield User.findOne({ where: { email } });
        if (exUser) {
            return res.redirect("/join?error=exist");
        }
        const hash = yield bcrypt.hash(password, 12);
        yield User.create({
            email,
            nick,
            password: hash,
        });
        return res.redirect("/");
    }
    catch (error) {
        console.error(error);
        return next(error);
    }
}));
