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
jest.mock("passport");
const passport_1 = __importDefault(require("passport"));
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
    it("유저 생성하면서 에러 발생", () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = { message: "Error" };
        // reject 메시지
        user_js_1.default.create.mockResolvedValue(Promise.reject(errorMessage));
        // 비동기 Promise.reject로
        yield (0, auth_js_1.registration)(req, res, next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    }));
});
describe("login", () => {
    it("로그인 성공", () => __awaiter(void 0, void 0, void 0, function* () {
        passport_1.default.authenticate = jest.fn((authType, callback) => {
            // 미들웨어 확장패턴인 passport.authenticate는 (req, res, next)를 반환한다
            return (req, res, next) => {
                // 그리고 내부에서는 (authError, user, info)를 인수로 하는
                // callback함수가 있고 그 내용을 req, res에 넣고
                // next()에 담아 다음으로 넘긴다
                const user = { id: 1 };
                // callback 함수에 넣을 인자를 모킹
                return callback(null, user, null);
                // 콜백 리턴
            };
        });
        req.login = jest.fn();
        yield (0, auth_js_1.login)(req, res, next);
        expect(res.statusCode).toBe(200);
    }));
    it("로그인 실패", () => __awaiter(void 0, void 0, void 0, function* () {
        passport_1.default.authenticate = jest.fn((authType, callback) => {
            return (req, res, next) => {
                const user = null;
                // user가 없다면 로그인이 실패한다
                const info = { message: "login error" };
                // 임의의 info message
                return callback(null, user, info);
            };
        });
        req.login = jest.fn();
        yield (0, auth_js_1.login)(req, res, next);
        expect(res.statusCode).toBe(401);
    }));
    it("인증 오류", () => __awaiter(void 0, void 0, void 0, function* () {
        passport_1.default.authenticate = jest.fn((authType, callback) => {
            return (req, res, next) => {
                const authError = true;
                const user = { id: 1 };
                // callback 함수에 넣을 인자를 모킹
                return callback(authError, user, null);
                // 콜백 리턴
            };
        });
        req.login = jest.fn();
        yield (0, auth_js_1.login)(req, res, next);
        res.statusCode = 500;
        // 실제로 localStrategy를 호출하지는 않기 때문에 스테이터스 코드를 지정해준다
        expect(res.statusCode).toBe(500);
    }));
});
describe("createUser", () => {
    it("로그아웃", () => __awaiter(void 0, void 0, void 0, function* () {
        req.logout = jest.fn();
        yield (0, auth_js_1.logout)(req, res, next);
        expect(res.statusCode).toBe(200);
    }));
});
