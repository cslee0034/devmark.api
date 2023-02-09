import { RequestHandler } from "express";
import ogs from "open-graph-scraper";
import Feed from "../models/feed";

// let options = { url: "https://naver.com/" };

/* OG */
const scrapOg: RequestHandler = async (req, res, next) => {
  try {
    const options = { url: req.body.options };
    await ogs(options).then((data) => {
      const { error, result, response } = data;
      console.log("error:", error);
      // 에러 발생시 true

      if (result.ogImage) {
        req.body = { ...req.body, og: result.ogImage };
      } else {
        res.end();
      }
    });
  } catch (error) {
    next(error);
  }
  next();
};

/* Create */
const createFeed: RequestHandler = async (req, res, next) => {
  try {
    const newFeed = await Feed.create({
      FeedName: req.body.feedName,
      FeedContent: req.body.feedContent,
      img: "http://localhost:5000/img/default.png",
      URL: req.body.url,
      UserId: req.user!.id,
    });
    req.body = { ...req.body, id: newFeed.dataValues.id };
    // 아이템 생성 성공 Status 201
  } catch (error) {
    console.error(error);
    next(error);
  }
  next();
};

/* Render */
const renderFeeds: RequestHandler = async (req, res, next) => {
  try {
    const renderFeeds = await Feed.findAll({
      order: [["id", "DESC"]],
    });
    if (!renderFeeds) {
      return res.end();
    } else {
      res.status(200);
      res.json(renderFeeds);
      // 아이템 가져오기 성공 Status 200
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

/* Update */
const updateImg: RequestHandler = async (req, res, next) => {
  try {
    const updateFeed = await Feed.update(
      {
        img: req.body.og.url,
      },
      {
        where: { id: req.body.id },
      }
    );
    res.status(200);
    // 수정 성공 Status
  } catch (error) {
    console.error(error);
    next(error);
  }
  next();
};

const deleteFeed: RequestHandler = async (req, res, next) => {
  try {
    const d_id = req.body.id;
    const deleteFeed = await Feed.destroy({ where: { id: d_id } });
  } catch (error) {
    console.error(error);
    next(error);
  }
  res.status(200).end();
  // 삭제 성공 status 200
};

export { scrapOg, createFeed, renderFeeds, updateImg, deleteFeed };
