import { Request, Response, NextFunction } from "express";
import {
  createMemo,
  renderMemo,
  renderMemoEach,
  deleteMemo,
} from "../../controller/memo.js";
import httpMocks from "node-mocks-http";

jest.mock("../../models/memo.js");
import Memo from "../../models/memo.js";

let req: Request, res: Response, next: NextFunction;
// beforeEach 위에서 선언 해주어야 각각 넣어줄 수 있다.
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
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
    (Memo.findOne as jest.Mock).mockResolvedValue(null);
    (Memo.create as jest.Mock).mockResolvedValue({});
  });

  it("메모가 없다면 메모 생성", async () => {
    await createMemo(req, res, next);
    // registration 비동기적으로 시행.
    expect(res.statusCode).toEqual(201);
    // res의 statusCode가 201로 return된다.
  });

  it("메모 생성하면서 에러 발생", async () => {
    const errorMessage = { message: "Error" };
    // reject 메시지
    (Memo.findOne as jest.Mock).mockResolvedValue(Promise.reject(errorMessage));
    // 비동기 Promise.reject로
    await createMemo(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  });
});
