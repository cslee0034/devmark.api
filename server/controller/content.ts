import { RequestHandler } from "express";
import Bookmark from "../models/bookmark.js";
import Memo from "../models/memo.js";

const createContent: RequestHandler = async (req, res, next) => {
  try {
    const newBookmark = await Bookmark.create({
      contentName: req.body.bookmarkName,
      URL: req.body.bookmarkURL,
      BoxId: req.body.boxId,
    });
    res.status(201).end();
    // 생성 성공 Status 201
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const renderContent: RequestHandler = async (req, res, next) => {
  try {
    if (req.query!.boxId) {
      const boxId = parseInt(req.query!.boxId as unknown as string);
      const renderBookmark = await Bookmark.findAll({
        where: { BoxId: boxId },
        include: [
          {
            model: Memo,
            attributes: ["id", "memoName"],
          },
        ],
      });
      if (!renderBookmark) {
        return res.end();
      } else {
        res.status(200);
        res.json(renderBookmark);
        // 아이템 가져오기 성공 Status 200
      }
    } else {
      // 쿼리에 boxId가 있다면 끝내기
      return;
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const updateContent: RequestHandler = async (req, res, next) => {
  try {
    const updateBookmark = await Bookmark.update(
      {
        contentName: req.body.bookmarkName,
        URL: req.body.bookmarkURL,
      },
      {
        where: { id: req.body.id },
      }
    );
    res.status(200).end();
    // 업데이트 성공 Status 200
  } catch (error) {
    console.error(error);
    next(error);
  }
  next();
};

const deleteContent: RequestHandler = async (req, res, next) => {
  try {
    const d_id = req.body.id;
    const deleteBookmark = await Bookmark.destroy({ where: { id: d_id } });
  } catch (error) {
    console.error(error);
    next(error);
  }
  res.status(200).end();
  // 삭제 성공 status 200
};

export { createContent, renderContent, deleteContent, updateContent };
