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
        expect(res.statusCode).toBe(200);
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
describe("readFeed", () => {
    beforeEach(() => {
        req.user = { id: 1 };
        req.body = {
            box: "temp_box",
            url: "temp_box_url",
            UserId: 1,
        };
    });
    it("피드가 있다면 피드 읽어온다", () => __awaiter(void 0, void 0, void 0, function* () {
        const renderedFeeds = { id: 1 };
        feed_js_2.default.findAll.mockResolvedValue(renderedFeeds);
        yield (0, feed_js_1.renderFeeds)(req, res, next);
        expect(res.statusCode).toBe(200);
    }));
    it("박스가 없다면 end()", () => __awaiter(void 0, void 0, void 0, function* () {
        const renderedFeeds = null;
        feed_js_2.default.findAll.mockResolvedValue(renderedFeeds);
        const spyFn = jest.spyOn(res, "end");
        // 가짜함수로 대체하지 않음 ( 결괏값이 실제 구현 값 )
        // res라는 객체의 end라는 함수에 spy를 붙여서 정보를 캘 수 있다.
        yield (0, feed_js_1.renderFeeds)(req, res, next);
        expect(spyFn).toBeCalled();
    }));
    it("박스 읽어오며 에러 발생", () => __awaiter(void 0, void 0, void 0, function* () {
        req.user = null;
        // req.user가 없을 경우.
        try {
            yield (0, feed_js_1.renderFeeds)(req, res, next);
        }
        catch (error) {
            expect(error).toBeTruthy();
            // 에러가 발생한다.
        }
    }));
});
describe("deleteFeed", () => {
    beforeEach(() => {
        req.user = { id: 1 };
        req.body = {
            id: 1,
        };
    });
    it("d_id가 있다면 삭제", () => __awaiter(void 0, void 0, void 0, function* () {
        feed_js_2.default.destroy.mockResolvedValue(null);
        yield (0, feed_js_1.deleteFeed)(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(next).toBeCalled();
        // update가 성공하면 next가 불려올 것이다.
    }));
    it("d_id가 없다면 에러", () => __awaiter(void 0, void 0, void 0, function* () {
        req.body = {};
        // body의 id를 삭제한다.
        const errorMessage = { message: "Error" };
        // 에러메시지.
        feed_js_2.default.destroy.mockResolvedValue(Promise.reject(errorMessage));
        // 비동기로 에러 메시지가 온다.
        yield (0, feed_js_1.deleteFeed)(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
        // 에러메시지가 next로와 함께 불린다.
    }));
});
