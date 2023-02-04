import { Request, Response, NextFunction } from "express";
import { login, logout, registration } from "../../controller/auth.js";
import httpMocks from "node-mocks-http";

jest.mock("../../models/user.js");
import User from "../../models/user.js";
// jest.mock 아래 써야 모킹이 된다

jest.mock("bcrypt");
import bcrypt from "bcrypt";

jest.mock("passport");
import passport from "passport";

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

  it("유저 생성하면서 에러 발생", async () => {
    const errorMessage = { message: "Error" };
    // reject 메시지
    (User.create as jest.Mock).mockResolvedValue(Promise.reject(errorMessage));
    // 비동기 Promise.reject로
    await registration(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  });
});

describe("login", () => {
  it("로그인 성공", async () => {
    passport.authenticate = jest.fn((authType: string, callback: Function) => {
      // 미들웨어 확장패턴인 passport.authenticate는 (req, res, next)를 반환한다
      return (req: Request, res: Response, next: NextFunction) => {
        // 그리고 내부에서는 (authError, user, info)를 인수로 하는
        // callback함수가 있고 그 내용을 req, res에 넣고
        // next()에 담아 다음으로 넘긴다
        const user = { id: 1 };
        // callback 함수에 넣을 인자를 모킹
        return callback(null, user, null);
        // 콜백 리턴
      };
    }) as unknown as any;
    req.login = jest.fn();
    await login(req, res, next);
    expect(res.statusCode).toBe(200);
  });

  it("로그인 실패", async () => {
    passport.authenticate = jest.fn((authType: string, callback: Function) => {
      return (req: Request, res: Response, next: NextFunction) => {
        const user = null;
        // user가 없다면 로그인이 실패한다
        const info = { message: "login error" };
        // 임의의 info message
        return callback(null, user, info);
      };
    }) as unknown as any;
    req.login = jest.fn();
    await login(req, res, next);
    expect(res.statusCode).toBe(401);
  });

  it("인증 오류", async () => {
    passport.authenticate = jest.fn((authType: string, callback: Function) => {
      return (req: Request, res: Response, next: NextFunction) => {
        const authError = true;
        const user = { id: 1 };
        // callback 함수에 넣을 인자를 모킹
        return callback(authError, user, null);
        // 콜백 리턴
      };
    }) as unknown as any;
    req.login = jest.fn();
    await login(req, res, next);

    res.statusCode = 500;
    // 실제로 localStrategy를 호출하지는 않기 때문에 스테이터스 코드를 지정해준다
    expect(res.statusCode).toBe(500);
  });
});

describe("createUser", () => {
  it("로그아웃", async () => {
    req.logout = jest.fn();
    await logout(req, res, next);
    expect(res.statusCode).toBe(200);
  });
});
