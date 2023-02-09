import {
  createFeed,
  deleteFeed,
  renderFeeds,
  scrapOg,
} from "../../controller/feed.js";
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
    expect(res.statusCode).toBe(200);
    // response statusCode should be 201
  });

  it("피드 생성?", async () => {
    try {
      await createFeed(req, res, next);
    } catch (error) {
      console.log(error);
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

describe("readFeed", () => {
  beforeEach(() => {
    req.user = { id: 1 };
    req.body = {
      box: "temp_box",
      url: "temp_box_url",
      UserId: 1,
    };
  });

  it("피드가 있다면 피드 읽어온다", async () => {
    const renderedFeeds = { id: 1 };

    (Feed.findAll as jest.Mock).mockResolvedValue(renderedFeeds);
    await renderFeeds(req, res, next);
    expect(res.statusCode).toBe(200);
  });

  it("박스가 없다면 end()", async () => {
    const renderedFeeds = null;
    (Feed.findAll as jest.Mock).mockResolvedValue(renderedFeeds);
    const spyFn = jest.spyOn(res, "end");
    // 가짜함수로 대체하지 않음 ( 결괏값이 실제 구현 값 )
    // res라는 객체의 end라는 함수에 spy를 붙여서 정보를 캘 수 있다.

    await renderFeeds(req, res, next);
    expect(spyFn).toBeCalled();
  });

  it("박스 읽어오며 에러 발생", async () => {
    req.user = null;
    // req.user가 없을 경우.
    try {
      await renderFeeds(req, res, next);
    } catch (error) {
      expect(error).toBeTruthy();
      // 에러가 발생한다.
    }
  });
});

describe("deleteFeed", () => {
  beforeEach(() => {
    req.user = { id: 1 };
    req.body = {
      id: 1,
    };
  });

  it("d_id가 있다면 삭제", async () => {
    (Feed.destroy as jest.Mock).mockResolvedValue(null);

    await deleteFeed(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(next).toBeCalled();
    // update가 성공하면 next가 불려올 것이다.
  });

  it("d_id가 없다면 에러", async () => {
    req.body = {};
    // body의 id를 삭제한다.
    const errorMessage = { message: "Error" };
    // 에러메시지.
    (Feed.destroy as jest.Mock).mockResolvedValue(Promise.reject(errorMessage));
    // 비동기로 에러 메시지가 온다.
    await deleteFeed(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
    // 에러메시지가 next로와 함께 불린다.
  });
});
