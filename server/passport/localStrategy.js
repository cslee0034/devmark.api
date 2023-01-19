var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import User from "../models/user.js";
export default () => {
    passport.use(new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
    }, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const exUser = yield User.findOne({ where: { email } });
            if (exUser) {
                const result = yield bcrypt.compare(password, exUser.password);
                if (result) {
                    done(null, exUser);
                }
                else {
                    done(null, false, { message: "password do not match" });
                }
            }
            else {
                done(null, false, { message: "user is not registered" });
            }
        }
        catch (error) {
            console.error(error);
            done(error);
        }
    })));
};
