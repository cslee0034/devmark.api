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
exports.logout = exports.login = exports.registration = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const passport_1 = __importDefault(require("passport"));
const user_js_1 = __importDefault(require("../models/user.js"));
/* registration */
const registration = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, nick, password } = req.body;
    try {
        const exUser = yield user_js_1.default.findOne({ where: { email } });
        if (exUser) {
            return res.send({ Error: "Account already exists" });
        }
        const hashPassword = yield bcrypt_1.default.hash(password, 12);
        yield user_js_1.default.create({
            email,
            nick,
            password: hashPassword,
        });
        return res.redirect("/");
    }
    catch (error) {
        console.error(error);
        return next(error);
    }
});
exports.registration = registration;
/* login */
const login = (req, res, next) => {
    passport_1.default.authenticate("local", (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            return res.json({ Error: info.message });
        }
        return req.login(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect("/");
        });
    })(req, res, next);
};
exports.login = login;
/* logout */
const logout = (req, res) => {
    req.logout(() => {
        res.status(302).end();
    });
};
exports.logout = logout;
