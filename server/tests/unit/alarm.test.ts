import {
  createAlarm,
  deleteAlarm,
  renderAlarm,
} from "../../controller/alarm.js";
import httpMocks from "node-mocks-http";

jest.mock("../../models/alarm.js");
import Alarm from "../../models/alarm.js";

let req: any, res: any, next: any;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe("createAlarm", () => {
  beforeEach(() => {
    req.user = { id: 1 };
    req.body = {
      alarmName: "temp_alarm",
      time: "Sat Feb 04 2023 16:30:53 GMT+0900",
    };
    (Alarm.create as jest.Mock).mockResolvedValue({});
  });

  it("알람 생성", async () => {
    await createAlarm(req, res, next);
    expect(res.statusCode).toBe(201);
  });

  it("알람 에러 발생", async () => {
    req.user = null;
    // req.user가 없을 경우.
    try {
      await createAlarm(req, res, next);
    } catch (error) {
      expect(error).toBeTruthy();
      // 에러가 발생한다.
    }
  });
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

  it("알람이 있다면 알람 읽어온다", async () => {
    const renderBoxs = { id: 1 };

    (Alarm.findAll as jest.Mock).mockResolvedValue(renderBoxs);

    await renderAlarm(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled).toBeTruthy();
    // res.status(200).send(); 같이 만약 보내오는 데이터가 있다면
    // send가 잘 보내져 왔다고 Truthy
    expect(res._getJSONData()).toStrictEqual(renderBoxs);
    // 보내져 오는 json 데이터가 ~~와 같다
  });

  it("알람이 없다면 end()", async () => {
    const renderBoxs = null;
    (Alarm.findAll as jest.Mock).mockResolvedValue(renderBoxs);
    const spyFn = jest.spyOn(res, "end");
    // 가짜함수로 대체하지 않음 ( 결괏값이 실제 구현 값 )
    // res라는 객체의 end라는 함수에 spy를 붙여서 정보를 캘 수 있다.

    await renderAlarm(req, res, next);
    expect(spyFn).toBeCalled();
  });

  it("알람 읽어오며 에러 발생", async () => {
    req.user = null;
    // req.user가 없을 경우.
    try {
      await createAlarm(req, res, next);
    } catch (error) {
      expect(error).toBeTruthy();
      // 에러가 발생한다.
    }
  });
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

  it("d_id가 있다면 삭제", async () => {
    (Alarm.destroy as jest.Mock).mockResolvedValue(null);

    await deleteAlarm(req, res, next);
    expect(res.statusCode).toBe(200);
    // 삭제 성공시 statuscode 200
  });

  it("d_id가 없다면 에러", async () => {
    req.body = {};
    // body의 id를 삭제한다.
    const errorMessage = { message: "Error" };
    // 에러메시지.
    (Alarm.destroy as jest.Mock).mockResolvedValue(
      Promise.reject(errorMessage)
    );
    // 비동기로 에러 메시지가 온다.
    await deleteAlarm(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
    // 에러메시지가 next로와 함께 불린다.
  });
});
