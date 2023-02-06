import { RequestHandler } from "express";
import ogs from "open-graph-scraper";
import Feed from "../models/feed";

// let options = { url: "https://naver.com/" };

const scrapOg: RequestHandler = async (req, res, next) => {
  try {
    const options = { url: req.body.options };
    await ogs(options).then((data) => {
      const { error, result, response } = data;
      console.log("error:", error);
      // 에러 발생시 true
      req.body = { ...req.body, og: result.ogImage };
      console.log(req.body);
      next();
    });
  } catch (error) {
    next(error);
  }
};

const createFeed: RequestHandler = async (req, res, next) => {
  try {
    const newFeed = await Feed.create({
      FeedName: req.body.feedName,
      FeedContent: req.body.feedContent,
      img: req.body.og.url,
      UserId: req.user!.id,
    });
    res.status(201).end();
    // 아이템 생성 성공 Status 201
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export { scrapOg, createFeed };
