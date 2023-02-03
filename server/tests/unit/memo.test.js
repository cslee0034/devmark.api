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
const memo_js_1 = require("../../controller/memo.js");
const node_mocks_http_1 = __importDefault(require("node-mocks-http"));
jest.mock("../../models/memo.js");
const memo_js_2 = __importDefault(require("../../models/memo.js"));
let req, res, next;
// beforeEach 위에서 선언 해주어야 각각 넣어줄 수 있다.
beforeEach(() => {
    req = node_mocks_http_1.default.createRequest();
    res = node_mocks_http_1.default.createResponse();
    next = jest.fn();
});
describe("createMemo", () => {
    beforeEach(() => {
        // 각각의 요소에 이메일 등록에 사용될 req.body를 넣어준다.
        req.body = {
            memoName: "temp_memo",
            memoContent: "temp_memo_content",
            BookmarkId: 1,
        };
        // Registration 내부에서 사용할 함수도 모킹해준다.
        // 테스트 통과를 가정하고 특정 value를 return하도록 mockResolvedValue
        memo_js_2.default.findOne.mockResolvedValue(null);
        memo_js_2.default.create.mockResolvedValue({});
    });
    it("메모가 없다면 메모 생성", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, memo_js_1.createMemo)(req, res, next);
        // registration 비동기적으로 시행.
        expect(res.statusCode).toEqual(201);
        // res의 statusCode가 201로 return된다.
    }));
    it("메모 생성하면서 에러 발생", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = { message: "Error" };
        // reject 메시지
        memo_js_2.default.findOne.mockResolvedValue(Promise.reject(errorMessage));
        // 비동기 Promise.reject로
        yield (0, memo_js_1.createMemo)(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    }));
});
