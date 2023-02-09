import httpMocks from "node-mocks-http";

jest.mock("../../models/box");
import Box from "../../models/box";
import { findUserBox } from "../checkUserBox";

let req: any, res: any, next: any;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe("Check if user have box", () => {
  beforeEach(() => {
    req.user = { id: 1 };
    // 각각의 요소에 이메일 등록에 사용될 req.body를 넣어준다.
    req.query = {
      boxId: 1,
    };
    (Box.findAll as jest.Mock).mockResolvedValue({});
  });

  it("User have box", async () => {
    (Box.findAll as jest.Mock).mockResolvedValue({
      box: 1,
    });
    await findUserBox(req, res, next);
    expect(res.statusCode).toBe(200);
  });

  it("User not have box", async () => {
    (Box.findAll as jest.Mock).mockResolvedValue(null);
    // box를 가지고 있지 않은 경우
    try {
      await findUserBox(req, res, next);
    } catch (error) {
      expect(error).toBeTruthy();
      // 에러가 발생한다.
    }
  });
});
