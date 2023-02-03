import { Request, Response, NextFunction } from "express";
import { registration } from "../../controller/auth.js";
import httpMocks from "node-mocks-http";

jest.mock("../../models/user.js");
import User from "../../models/user.js"; 
// jest.mock 아래 써야 모킹이 된다

jest.mock("bcrypt");
import bcrypt from "bcrypt";

let req: Request, res: any, next: NextFunction;
// beforeEach 위에서 선언 해주어야 각각 넣어줄 수 있다.
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
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
    (User.findOne as jest.Mock).mockResolvedValue(null);
    (bcrypt.hash as jest.Mock).mockResolvedValue("hashed_password");
    (User.create as jest.Mock).mockResolvedValue({});
  });

  it("이메일이 없을때 유저 생성", async () => {
    await registration(req, res, next);
    // registration 비동기적으로 시행.
    expect(res.statusCode).toEqual(201);
    // res의 statusCode가 201로 return된다.
  });

  it("이미 등록된 이메일이 있다면 error 출력", async () => {
    (User.findOne as jest.Mock).mockResolvedValue({
      email: "user",
      // User.findOne이 값을 찾은 경우 (등록된 이메일이 있는 경우)
    });
    await registration(req, res, next);
    // registration 비동기적으로 시행.
    expect(res.statusCode).toEqual(409);
    // statusCode가 200이다.
    expect(res._getJSONData()).toStrictEqual({
      Error: "Account already exists",
    });
    // json으로 오는 data가 Error: "Account already exists"이다.
  });
});
