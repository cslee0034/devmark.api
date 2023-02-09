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
const feed_js_1 = require("../../controller/feed.js");
const node_mocks_http_1 = __importDefault(require("node-mocks-http"));
jest.mock("../../models/feed.js");
const feed_js_2 = __importDefault(require("../../models/feed.js"));
jest.mock("open-graph-scraper");
// alias가 아니라 실제 import하는 npm패키지의 이름대로 모킹해야 한다.
const open_graph_scraper_1 = __importDefault(require("open-graph-scraper"));
let req, res, next;
beforeEach(() => {
    req = node_mocks_http_1.default.createRequest();
    res = node_mocks_http_1.default.createResponse();
    next = jest.fn();
});
describe("srapOg", () => {
    beforeEach(() => {
        req.user = { id: 1 };
        req.body = {
            id: 1,
            options: "https://naver.com/",
        };
    });
    it("OG 가져오기", () => __awaiter(void 0, void 0, void 0, function* () {
        open_graph_scraper_1.default.mockResolvedValue({
            error: false,
            result: {
                ogImage: {
                    url: "https://temp.com/image.png",
                },
            },
        });
        yield (0, feed_js_1.scrapOg)(req, res, next);
        expect(req.body).toHaveProperty("id", 1);
        expect(req.body).toHaveProperty("og");
        expect(next).toBeCalled();
    }));
    it("OG 에러 발생", () => __awaiter(void 0, void 0, void 0, function* () {
        open_graph_scraper_1.default.mockResolvedValue({
            error: true,
            result: {
                ogImage: {
                    url: "https://temp.com/image.png",
                },
            },
        });
        // error: true로 오버랩 한다.
        try {
            yield (0, feed_js_1.scrapOg)(req, res, next);
        }
        catch (error) {
            expect(error).toBeTruthy();
            // 에러가 발생한다.
        }
    }));
});
describe("createFeed", () => {
    beforeEach(() => {
        req.user = { id: 1 };
        req.body = {
            feedName: "temp_feed",
            feedContent: "temp_feed_content",
            og: { url: "https://temp.com/image.png" },
        };
        feed_js_2.default.create.mockResolvedValue({});
    });
    it("creates a feed", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, feed_js_1.createFeed)(req, res, next);
        expect(res.statusCode).toBe(201);
        // response statusCode should be 201
    }));
    it("피드 생성?", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield (0, feed_js_1.createFeed)(req, res, next);
        }
        catch (error) {
            console.log(error);
            expect(error).toBeTruthy();
            // 에러가 발생한다.
        }
    }));
    it("피드 에러 발생", () => __awaiter(void 0, void 0, void 0, function* () {
        req.user = null;
        // req.user가 없을 경우.
        try {
            yield (0, feed_js_1.createFeed)(req, res, next);
        }
        catch (error) {
            expect(error).toBeTruthy();
            // 에러가 발생한다.
        }
    }));
});
