import { RequestHandler } from "express";
import { QueryTypes } from "sequelize";
import { sequelize } from "../models/index.js";
import Memo from "../models/memo.js";

const createMemo: RequestHandler = async (req, res, next) => {
  try {
    const newMemo = await Memo.create({
      memoName: req.body.memoName,
      memoContent: req.body.memoContent,
      BookmarkId: req.body.bookmarkId,
    });
    res.status(201).end();
    // 생성 성공 Status 201
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const renderMemo: RequestHandler = async (req, res, next) => {
  try {
    const UserId = req.user!.id;
    const query = `SELECT b.contentName, m.memoName, m.id FROM bookmarks b, memos m, boxs x WHERE b.id = m.BookmarkId AND b.BoxId = x.id AND x.UserId = ${UserId} ORDER BY b.contentName ASC`;
    const memos = await sequelize.query(query, {
      type: QueryTypes.SELECT,
      raw: true,
    });

    if (!memos) {
      return res.end();
    } else {
      res.status(200).json(memos);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const renderMemoEach: RequestHandler = async (req, res, next) => {
  try {
    const id = parseInt(req.query!.memoId as unknown as string);
    const memos = await Memo.findOne({ where: { id } });
    if (!memos) {
      return res.end();
    } else {
      res.status(200).json(memos);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const updateMemo: RequestHandler = async (req, res, next) => {
  try {
    const Memos = await Memo.update(
      {
        memoName: req.body.memoName,
        memoContent: req.body.memoContent,
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

const deleteMemo: RequestHandler = async (req, res, next) => {
  try {
    const d_id = req.body.id;
    const deleteMemo = await Memo.destroy({ where: { id: d_id } });
  } catch (error) {
    console.error(error);
    next(error);
  }
  res.status(200).end();
  // 삭제 성공 Status 200
};

// export { createMemo, /*renderContent,*/ deleteMemo, /*updateContent*/ };
export { createMemo, renderMemo, renderMemoEach, updateMemo, deleteMemo };
