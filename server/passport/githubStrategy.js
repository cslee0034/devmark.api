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
const passport_1 = __importDefault(require("passport"));
const passport_github_1 = require("passport-github");
const user_1 = __importDefault(require("../models/user"));
exports.default = () => {
    passport_1.default.use(new passport_github_1.Strategy({
        clientID: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
        callbackURL: "/api/user/github/callback",
    }, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("github profile", profile);
        try {
            const exUser = yield user_1.default.findOne({
                where: { snsId: profile.id, provider: "github" },
            });
            if (exUser) {
                done(null, exUser);
            }
            else {
                const { id, name, email } = profile._json;
                const newUser = yield user_1.default.create({
                    email: email ? email : null,
                    // 설정에 따라 이메일이 있을 수도 있고 없을 수도 있다
                    nick: name,
                    snsId: id,
                    provider: "github",
                });
                done(null, newUser);
            }
        }
        catch (error) {
            console.error(error);
            done(error);
        }
    })));
};
