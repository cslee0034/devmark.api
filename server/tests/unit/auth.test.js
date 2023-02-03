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
const auth_js_1 = require("../../controller/auth.js");
const node_mocks_http_1 = __importDefault(require("node-mocks-http"));
jest.mock("../../models/user.js");
const user_js_1 = __importDefault(require("../../models/user.js"));
// jest.mock 아래 써야 모킹이 된다
jest.mock("bcrypt");
const bcrypt_1 = __importDefault(require("bcrypt"));
let req, res, next;
// beforeEach 위에서 선언 해주어야 각각 넣어줄 수 있다.
beforeEach(() => {
    req = node_mocks_http_1.default.createRequest();
    res = node_mocks_http_1.default.createResponse();
    next = jest.fn();
});
describe("createUser", () => {
    beforeEach(() => {
        // 각각의 요소에 이메일 등록에 사용될 req.body를 넣어준다.
        req.body = {
            email: "temp@naver.com",
            nick: "temp",
            password: "temp_password",
        };
        // Registration 내부에서 사용할 함수도 모킹해준다.
        // 테스트 통과를 가정하고 특정 value를 return하도록 mockResolvedValue
        user_js_1.default.findOne.mockResolvedValue(null);
        bcrypt_1.default.hash.mockResolvedValue("hashed_password");
        user_js_1.default.create.mockResolvedValue({});
    });
    it("이메일이 없을때 유저 생성", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, auth_js_1.registration)(req, res, next);
        // registration 비동기적으로 시행.
        expect(res.statusCode).toEqual(201);
        // res의 statusCode가 201로 return된다.
    }));
    it("이미 등록된 이메일이 있다면 error 출력", () => __awaiter(void 0, void 0, void 0, function* () {
        user_js_1.default.findOne.mockResolvedValue({
            email: "user",
            // User.findOne이 값을 찾은 경우 (등록된 이메일이 있는 경우)
        });
        yield (0, auth_js_1.registration)(req, res, next);
        // registration 비동기적으로 시행.
        expect(res.statusCode).toEqual(409);
        // statusCode가 200이다.
        expect(res._getJSONData()).toStrictEqual({
            Error: "Account already exists",
        });
        // json으로 오는 data가 Error: "Account already exists"이다.
    }));
});
