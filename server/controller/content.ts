import { RequestHandler } from "express";
import bookmark from "../models/bookmark";

const createContent: RequestHandler = async (req, res, next) => {
  try {
    const box = await bookmark.create({
      contentName: req.body.bookmarkName,
      URL: req.body.bookmarkURL,
      BoxId: req.body.boxId,
    });
    res.redirect("/");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const renderContent: RequestHandler = async (req, res, next) => {
  try {
    if (req.query!.boxId) {
      const boxId = parseInt(req.query!.boxId as unknown as string);
      const Bookmarks = await bookmark.findAll({ where: { BoxId: boxId } });
      if (!Bookmarks) {
        return res.end();
      } else {
        res.json(Bookmarks);
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
  console.log("hihihi", req.body);
  try {
    const Bookmark = await bookmark.update(
      {
        contentName: req.body.bookmarkName,
        URL: req.body.bookmarkURL,
      },
      {
        where: { id: req.body.id },
      }
    );
    res.redirect("/");
  } catch (error) {
    console.error(error);
    next(error);
  }
  next();
};

const deleteContent: RequestHandler = async (req, res, next) => {
  try {
    const d_id = req.body.id;
    const box = await bookmark.destroy({ where: { id: d_id } });
  } catch (error) {
    console.error(error);
    next(error);
  }
  next();
};

export { createContent, renderContent, deleteContent, updateContent };
