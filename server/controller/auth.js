var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from "bcrypt";
import passport from "passport";
import User from "../models/user.js";
/* registration */
const registration = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, nick, password } = req.body;
    try {
        const exUser = yield User.findOne({ where: { email } });
        if (exUser) {
            return res.send({ Error: "Account already exists" });
        }
        const hashPassword = yield bcrypt.hash(password, 12);
        yield User.create({
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
/* login */
const login = (req, res, next) => {
    passport.authenticate("local", (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            return res.send({ Error: info.message });
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
/* logout */
const logout = (req, res) => {
    req.logout(() => {
        res.redirect("/");
    });
};
export { registration, login, logout };
