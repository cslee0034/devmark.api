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
exports.deleteFeed = exports.updateImg = exports.renderFeeds = exports.createFeed = exports.scrapOg = void 0;
const open_graph_scraper_1 = __importDefault(require("open-graph-scraper"));
const feed_1 = __importDefault(require("../models/feed"));
// let options = { url: "https://naver.com/" };
/* OG */
const scrapOg = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const options = { url: req.body.options };
        yield (0, open_graph_scraper_1.default)(options).then((data) => {
            const { error, result, response } = data;
            console.log("error:", error);
            // 에러 발생시 true
            if (result.ogImage) {
                req.body = Object.assign(Object.assign({}, req.body), { og: result.ogImage });
            }
            else {
                res.end();
            }
        });
    }
    catch (error) {
        next(error);
    }
    next();
});
exports.scrapOg = scrapOg;
/* Create */
const createFeed = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newFeed = yield feed_1.default.create({
            FeedName: req.body.feedName,
            FeedContent: req.body.feedContent,
            img: "http://localhost:5000/img/default.png",
            URL: req.body.url,
            UserId: req.user.id,
        });
        req.body = Object.assign(Object.assign({}, req.body), { id: newFeed.dataValues.id });
        res.status(201);
        // 아이템 생성 성공 Status 200
    }
    catch (error) {
        console.error(error);
        next(error);
    }
    next();
});
exports.createFeed = createFeed;
/* Render */
const renderFeeds = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const renderFeeds = yield feed_1.default.findAll({
            order: [["id", "DESC"]],
        });
        if (!renderFeeds) {
            return res.end();
        }
        else {
            res.status(200);
            res.json(renderFeeds);
            // 아이템 가져오기 성공 Status 200
        }
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.renderFeeds = renderFeeds;
/* Update */
const updateImg = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateFeed = yield feed_1.default.update({
            img: req.body.og.url,
        }, {
            where: { id: req.body.id },
        });
        res.status(200);
        // 수정 성공 Status
    }
    catch (error) {
        console.error(error);
        next(error);
    }
    next();
});
exports.updateImg = updateImg;
const deleteFeed = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const d_id = req.body.id;
        const deleteFeed = yield feed_1.default.destroy({ where: { id: d_id } });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
    res.status(200).end();
    // 삭제 성공 status 200
});
exports.deleteFeed = deleteFeed;
