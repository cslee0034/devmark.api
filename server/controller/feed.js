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
exports.createFeed = exports.scrapOg = void 0;
const open_graph_scraper_1 = __importDefault(require("open-graph-scraper"));
const feed_1 = __importDefault(require("../models/feed"));
// let options = { url: "https://naver.com/" };
const scrapOg = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const options = { url: req.body.options };
        yield (0, open_graph_scraper_1.default)(options).then((data) => {
            const { error, result, response } = data;
            console.log("error:", error);
            // 에러 발생시 true
            req.body = Object.assign(Object.assign({}, req.body), { og: result.ogImage });
            console.log(req.body);
            next();
        });
    }
    catch (error) {
        next(error);
    }
});
exports.scrapOg = scrapOg;
const createFeed = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newFeed = yield feed_1.default.create({
            FeedName: req.body.feedName,
            FeedContent: req.body.feedContent,
            img: req.body.og.url,
            UserId: req.user.id,
        });
        res.status(201).end();
        // 아이템 생성 성공 Status 201
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.createFeed = createFeed;
