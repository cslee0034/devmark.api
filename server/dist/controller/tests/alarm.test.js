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
const alarm_js_1 = require("../../controller/alarm.js");
const node_mocks_http_1 = __importDefault(require("node-mocks-http"));
jest.mock("../../models/alarm.js");
const alarm_js_2 = __importDefault(require("../../models/alarm.js"));
let req, res, next;
beforeEach(() => {
    req = node_mocks_http_1.default.createRequest();
    res = node_mocks_http_1.default.createResponse();
    next = jest.fn();
});
describe("createAlarm", () => {
    beforeEach(() => {
        req.user = { id: 1 };
        req.body = {
            alarmName: "temp_alarm",
            time: "Sat Feb 04 2023 16:30:53 GMT+0900",
        };
        alarm_js_2.default.create.mockResolvedValue({});
    });
    it("알람 생성", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, alarm_js_1.createAlarm)(req, res, next);
        expect(res.statusCode).toBe(201);
    }));
    it("알람 에러 발생", () => __awaiter(void 0, void 0, void 0, function* () {
        req.user = null;
        // req.user가 없을 경우.
        try {
            yield (0, alarm_js_1.createAlarm)(req, res, next);
        }
        catch (error) {
            expect(error).toBeTruthy();
            // 에러가 발생한다.
        }
    }));
});
describe("readAlarm", () => {
    beforeEach(() => {
        req.user = { id: 1 };
        req.body = {
            box: "temp_box",
            url: "temp_box_url",
            UserId: 1,
        };
    });
    it("알람이 있다면 알람 읽어온다", () => __awaiter(void 0, void 0, void 0, function* () {
        const renderBoxs = { id: 1 };
        alarm_js_2.default.findAll.mockResolvedValue(renderBoxs);
        yield (0, alarm_js_1.renderAlarm)(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled).toBeTruthy();
        // res.status(200).send(); 같이 만약 보내오는 데이터가 있다면
        // send가 잘 보내져 왔다고 Truthy
        expect(res._getJSONData()).toStrictEqual(renderBoxs);
        // 보내져 오는 json 데이터가 ~~와 같다
    }));
    it("알람이 없다면 end()", () => __awaiter(void 0, void 0, void 0, function* () {
        const renderBoxs = null;
        alarm_js_2.default.findAll.mockResolvedValue(renderBoxs);
        const spyFn = jest.spyOn(res, "end");
        // 가짜함수로 대체하지 않음 ( 결괏값이 실제 구현 값 )
        // res라는 객체의 end라는 함수에 spy를 붙여서 정보를 캘 수 있다.
        yield (0, alarm_js_1.renderAlarm)(req, res, next);
        expect(spyFn).toBeCalled();
    }));
    it("알람 읽어오며 에러 발생", () => __awaiter(void 0, void 0, void 0, function* () {
        req.user = null;
        // req.user가 없을 경우.
        try {
            yield (0, alarm_js_1.createAlarm)(req, res, next);
        }
        catch (error) {
            expect(error).toBeTruthy();
            // 에러가 발생한다.
        }
    }));
});
describe("deleteAlarm", () => {
    beforeEach(() => {
        req.user = { id: 1 };
        req.body = {
            box: "temp_box",
            url: "temp_box_url",
            id: 1,
        };
    });
    it("d_id가 있다면 삭제", () => __awaiter(void 0, void 0, void 0, function* () {
        alarm_js_2.default.destroy.mockResolvedValue(null);
        yield (0, alarm_js_1.deleteAlarm)(req, res, next);
        expect(res.statusCode).toBe(200);
        // 삭제 성공시 statuscode 200
    }));
    it("d_id가 없다면 에러", () => __awaiter(void 0, void 0, void 0, function* () {
        req.body = {};
        // body의 id를 삭제한다.
        const errorMessage = { message: "Error" };
        // 에러메시지.
        alarm_js_2.default.destroy.mockResolvedValue(Promise.reject(errorMessage));
        // 비동기로 에러 메시지가 온다.
        yield (0, alarm_js_1.deleteAlarm)(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
        // 에러메시지가 next로와 함께 불린다.
    }));
});
