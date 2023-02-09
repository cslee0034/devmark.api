"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const localStrategy_js_1 = __importDefault(require("./localStrategy.js"));
const kakaoStrategy_js_1 = __importDefault(require("./kakaoStrategy.js"));
const githubStrategy_js_1 = __importDefault(require("./githubStrategy.js"));
const user_js_1 = __importDefault(require("../models/user.js"));
exports.default = () => {
    passport_1.default.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport_1.default.deserializeUser((id, done) => {
        user_js_1.default.findOne({
            where: { id },
        })
            .then((user) => done(null, user))
            .catch((err) => done(err));
    });
    (0, localStrategy_js_1.default)();
    (0, kakaoStrategy_js_1.default)();
    (0, githubStrategy_js_1.default)();
};
