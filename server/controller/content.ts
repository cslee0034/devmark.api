import { RequestHandler } from "express";
import bookmark from "../models/bookmark.js";

const createContent: RequestHandler = async (req, res, next) => {
  try {
    const newBookmark = await bookmark.create({
      contentName: req.body.bookmarkName,
      URL: req.body.bookmarkURL,
      BoxId: req.body.boxId,
    });
    res.status(200).end();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const renderContent: RequestHandler = async (req, res, next) => {
  try {
    if (req.query!.boxId) {
      const boxId = parseInt(req.query!.boxId as unknown as string);
      const renderBookmark = await bookmark.findAll({
        where: { BoxId: boxId },
      });
      if (!renderBookmark) {
        return res.end();
      } else {
        res.status(200);
        res.json(renderBookmark);
      }
    } else {
      return;
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const updateContent: RequestHandler = async (req, res, next) => {
  try {
    const updateBookmark = await bookmark.update(
      {
        contentName: req.body.bookmarkName,
        URL: req.body.bookmarkURL,
      },
      {
        where: { id: req.body.id },
      }
    );
    res.status(200).end();
  } catch (error) {
    console.error(error);
    next(error);
  }
  next();
};

const deleteContent: RequestHandler = async (req, res, next) => {
  try {
    const d_id = req.body.id;
    const deleteBookmark = await bookmark.destroy({ where: { id: d_id } });
  } catch (error) {
    console.error(error);
    next(error);
  }
  res.status(200).end();
};

export { createContent, renderContent, deleteContent, updateContent };
