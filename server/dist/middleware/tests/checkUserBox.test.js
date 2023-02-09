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
const node_mocks_http_1 = __importDefault(require("node-mocks-http"));
jest.mock("../../models/box");
const box_1 = __importDefault(require("../../models/box"));
const checkUserBox_1 = require("../checkUserBox");
let req, res, next;
beforeEach(() => {
    req = node_mocks_http_1.default.createRequest();
    res = node_mocks_http_1.default.createResponse();
    next = jest.fn();
});
describe("Check if user have box", () => {
    beforeEach(() => {
        req.user = { id: 1 };
        // 각각의 요소에 이메일 등록에 사용될 req.body를 넣어준다.
        req.query = {
            boxId: 1,
        };
        box_1.default.findAll.mockResolvedValue({});
    });
    it("User have box", () => __awaiter(void 0, void 0, void 0, function* () {
        box_1.default.findAll.mockResolvedValue({
            box: 1,
        });
        yield (0, checkUserBox_1.findUserBox)(req, res, next);
        expect(res.statusCode).toBe(200);
    }));
    it("User not have box", () => __awaiter(void 0, void 0, void 0, function* () {
        box_1.default.findAll.mockResolvedValue(null);
        // box를 가지고 있지 않은 경우
        try {
            yield (0, checkUserBox_1.findUserBox)(req, res, next);
        }
        catch (error) {
            expect(error).toBeTruthy();
            // 에러가 발생한다.
        }
    }));
});
