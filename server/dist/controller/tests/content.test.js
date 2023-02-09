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
const content_js_1 = require("../../controller/content.js");
const node_mocks_http_1 = __importDefault(require("node-mocks-http"));
jest.mock("../../models/bookmark.js");
const bookmark_js_1 = __importDefault(require("../../models/bookmark.js"));
let req, res, next;
// beforeEach 위에서 선언 해주어야 각각 넣어줄 수 있다.
beforeEach(() => {
    req = node_mocks_http_1.default.createRequest();
    res = node_mocks_http_1.default.createResponse();
    next = jest.fn();
});
describe("createContent", () => {
    beforeEach(() => {
        req.user = { id: 1 };
        // 각각의 요소에 이메일 등록에 사용될 req.body를 넣어준다.
        req.body = {
            bookmarkName: "temp_content",
            bookmarkURL: "temp_content_url",
            boxId: 1,
        };
        // Registration 내부에서 사용할 함수도 모킹해준다.
        // 테스트 통과를 가정하고 특정 value를 return하도록 mockResolvedValue
        // (Memo.findOne as jest.Mock).mockResolvedValue(null);
        bookmark_js_1.default.create.mockResolvedValue({});
    });
    it("북마크 생성", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, content_js_1.createContent)(req, res, next);
        expect(res.statusCode).toBe(201);
        // res의 statusCode가 201로 return된다.
    }));
    it("북마크 에러 발생", () => __awaiter(void 0, void 0, void 0, function* () {
        req.user = null;
        // req.user가 없을 경우.
        try {
            yield (0, content_js_1.createContent)(req, res, next);
        }
        catch (error) {
            expect(error).toBeTruthy();
            // 에러가 발생한다.
        }
    }));
});
describe("readContent", () => {
    beforeEach(() => {
        req.user = { id: 1 };
        req.body = {
            bookmarkName: "temp_content",
            bookmarkURL: "temp_content_url",
            boxId: 1,
        };
        req.query = {
            boxId: 1,
        };
    });
    it("북마크가 있다면 북마크 읽어온다", () => __awaiter(void 0, void 0, void 0, function* () {
        const renderBookmarks = { id: 1 };
        bookmark_js_1.default.findAll.mockResolvedValue(renderBookmarks);
        yield (0, content_js_1.renderContent)(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled).toBeTruthy();
        // res.status(200).send(); 같이 만약 보내오는 데이터가 있다면
        // send가 잘 보내져 왔다고 Truthy
        expect(res._getJSONData()).toStrictEqual(renderBookmarks);
        // 보내져 오는 json 데이터가 ~~와 같다
    }));
    it("북마크가 없다면 end()", () => __awaiter(void 0, void 0, void 0, function* () {
        const renderBookmarks = null;
        bookmark_js_1.default.findAll.mockResolvedValue(renderBookmarks);
        const spyFn = jest.spyOn(res, "end");
        // 가짜함수로 대체하지 않음 ( 결괏값이 실제 구현 값 )
        // res라는 객체의 end라는 함수에 spy를 붙여서 정보를 캘 수 있다.
        yield (0, content_js_1.renderContent)(req, res, next);
        expect(spyFn).toBeCalled();
    }));
    it("북마크 읽어오며 에러 발생", () => __awaiter(void 0, void 0, void 0, function* () {
        req.user = null;
        // req.user가 없을 경우.
        try {
            yield (0, content_js_1.createContent)(req, res, next);
        }
        catch (error) {
            expect(error).toBeTruthy();
            // 에러가 발생한다.
        }
    }));
});
describe("updateContent", () => {
    beforeEach(() => {
        req.user = { id: 1 };
        req.body = {
            bookmarkName: "temp_content",
            bookmarkURL: "temp_content_url",
            id: 1,
        };
    });
    it("요소가 전부 있다면 북마크 수정", () => __awaiter(void 0, void 0, void 0, function* () {
        bookmark_js_1.default.update.mockResolvedValue(null);
        yield (0, content_js_1.updateContent)(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(next).toBeCalled();
        // update가 성공하면 next가 불려올 것이다.
    }));
    it("업데이트할 정보가 없는 경우 error", () => __awaiter(void 0, void 0, void 0, function* () {
        req.body = {};
        // body에 정보가 없는 경우.
        const errorMessage = { message: "Error" };
        // 에러메시지.
        bookmark_js_1.default.update.mockResolvedValue(Promise.reject(errorMessage));
        // 비동기로 에러 메시지가 온다.
        yield (0, content_js_1.updateContent)(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
        // 에러메시지가 next로와 함께 불린다.
    }));
    it("북마크 업데이트 하면서 에러 발생", () => __awaiter(void 0, void 0, void 0, function* () {
        // Bookmark.update as jest.Mock).mockResolvedValue가 없다.
        try {
            yield (0, content_js_1.updateContent)(req, res, next);
        }
        catch (error) {
            expect(error).toBeTruthy();
            // 에러가 발생한다.
        }
    }));
});
describe("deleteBookmark", () => {
    beforeEach(() => {
        req.user = { id: 1 };
        req.body = {
            bookmarkName: "temp_content",
            bookmarkURL: "temp_content_url",
            id: 1,
        };
    });
    it("d_id가 있다면 삭제", () => __awaiter(void 0, void 0, void 0, function* () {
        bookmark_js_1.default.destroy.mockResolvedValue(null);
        yield (0, content_js_1.deleteContent)(req, res, next);
        expect(res.statusCode).toBe(200);
        // status 200
    }));
    it("d_id가 없다면 에러", () => __awaiter(void 0, void 0, void 0, function* () {
        req.body = {};
        // body의 id를 삭제한다.
        const errorMessage = { message: "Error" };
        // 에러메시지.
        bookmark_js_1.default.destroy.mockResolvedValue(Promise.reject(errorMessage));
        // 비동기로 에러 메시지가 온다.
        yield (0, content_js_1.deleteContent)(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
        // 에러메시지가 next로와 함께 불린다.
    }));
});
