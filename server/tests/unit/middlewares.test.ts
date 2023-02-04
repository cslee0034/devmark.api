import { isLoggedIn, isNotLoggedIn } from "../../middleware/middleware.js";
import { Request, Response } from "express";

describe("isLoggedIn", () => {
  const res = {
    status: jest.fn(() => res),
    // res.status(403).send('hello')같은 메서드 체이닝이 가능해야 하기 때문에
    // 자기 자신 res를 반환하도록 한다
    send: jest.fn(),
    json: jest.fn(),
  } as unknown as Response;
  const next = jest.fn();

  test("로그인 되어있으면 isLoggedIn이 next를 호출", () => {
    const req = {
      isAuthenticated: jest.fn(() => true),
    } as unknown as Request;
    isLoggedIn(req, res, next); 
    // 함수가 실행되서 true이면 next()를 반환하게 된다.
    expect(next).toBeCalledTimes(1); 
    // next가 1번 호출되는지 검증
  });

  test("로그인 되어있지 않으면 isLoggedIn이 에러를 응답", () => {
    const req = {
      isAuthenticated: jest.fn(() => false),
    } as unknown as Request;
    isLoggedIn(req, res, next);
    expect(res.status).toBeCalledWith(403);
    // 403이라는 파라미터(인수)를 가진 함수가 호출된 적 있는지
    expect(res.json).toBeCalledWith({ Error: "Login required" });
  });
});

describe("isNotLoggedIn", () => {
  const res = {
    status: jest.fn(() => res),
    // res.status(403).send('hello')같은 메서드 체이닝이 가능해야 하기 때문에
    // 자기 자신 res를 반환하도록 한다
    send: jest.fn(),
    json: jest.fn(),
  } as unknown as Response;
  const next = jest.fn();

  test("로그인 되어있으면 isNotLoggedIn이 에러를 응답", () => {
    const req = {
      isAuthenticated: jest.fn(() => true),
    } as unknown as Request;
    isNotLoggedIn(req, res, next);
    expect(res.json).toBeCalledWith({ Error: "Already loggedin" });
  });

  test("로그인 되어있지 않으면 isNotLoggedIn이 next를 호출", () => {
    const req = {
      isAuthenticated: jest.fn(() => false),
    } as unknown as Request;
    isNotLoggedIn(req, res, next);
    expect(next).toHaveBeenCalledTimes(1);
  });
});
