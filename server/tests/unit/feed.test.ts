import { createFeed, scrapOg } from "../../controller/feed.js";
import httpMocks from "node-mocks-http";

jest.mock("../../models/feed.js");
import Feed from "../../models/feed.js";

jest.mock("open-graph-scraper");
// alias가 아니라 실제 import하는 npm패키지의 이름대로 모킹해야 한다.
import ogs from "open-graph-scraper";

let req: any, res: any, next: any;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe("srapOg", () => {
  beforeEach(() => {
    req.user = { id: 1 };
    req.body = {
      id: 1,
      options: "https://naver.com/",
    };
  });
  it("OG 가져오기", async () => {
    (ogs as jest.Mock).mockResolvedValue({
      error: false,
      result: {
        ogImage: {
          url: "https://temp.com/image.png",
        },
      },
    });
    await scrapOg(req, res, next);
    expect(req.body).toHaveProperty("id", 1);
    expect(req.body).toHaveProperty("og");
    expect(next).toBeCalled();
  });

  it("OG 에러 발생", async () => {
    (ogs as jest.Mock).mockResolvedValue({
      error: true,
      result: {
        ogImage: {
          url: "https://temp.com/image.png",
        },
      },
    });
    // error: true로 오버랩 한다.
    try {
      await scrapOg(req, res, next);
    } catch (error) {
      expect(error).toBeTruthy();
      // 에러가 발생한다.
    }
  });
});
describe("createFeed", () => {
  beforeEach(() => {
    req.user = { id: 1 };
    req.body = {
      feedName: "temp_feed",
      feedContent: "temp_feed_content",
      og: { url: "https://temp.com/image.png" },
    };
    (Feed.create as jest.Mock).mockResolvedValue({});
  });

  it("creates a feed", async () => {
    await createFeed(req, res, next);
    expect(res.statusCode).toBe(201);
    // response statusCode should be 201
  });

  it("피드 생성?", async () => {
    try {
      await createFeed(req, res, next);
    } catch (error) {
      console.log(error)
      expect(error).toBeTruthy();
      // 에러가 발생한다.
    }
  });

  it("피드 에러 발생", async () => {
    req.user = null;
    // req.user가 없을 경우.
    try {
      await createFeed(req, res, next);
    } catch (error) {
      expect(error).toBeTruthy();
      // 에러가 발생한다.
    }
  });
});
