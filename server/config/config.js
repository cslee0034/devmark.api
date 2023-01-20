"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    development: {
        username: 'root',
        password: process.env.DB_PASSWORD,
        database: 'dev-mark',
        host: '127.0.0.1',
        dialect: 'mysql',
    },
    test: {
        username: "root",
        password: process.env.DB_PASSWORD,
        database: 'dev-mark_test',
        host: "127.0.0.1",
        dialect: "mysql"
    },
    production: {
        username: 'root',
        password: process.env.DB_PASSWORD,
        database: 'dev-mark',
        host: '127.0.0.1',
        dialect: 'mysql',
        logging: false,
    },
};
