import { RequestHandler } from "express";
import memo from "../models/memo.js";

const createMemo: RequestHandler = async (req, res, next) => {
  try {
    const newMemo = await memo.create({
      memoName: req.body.memoName,
      memoContent: req.body.memoContent,
      BookmarkId: req.body.bookmarkId,
    });
    res.status(200).end();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// const renderContent: RequestHandler = async (req, res, next) => {
//   try {
//     if (req.query!.boxId) {
//       const boxId = parseInt(req.query!.boxId as unknown as string);
//       const memos = await memo.findAll({ where: { BoxId: boxId } });
//       if (!Bookmarks) {
//         return res.end();
//       } else {
//         res.json(Bookmarks);
//       }
//     } else {
//       return;
//     }
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// };

// const updateContent: RequestHandler = async (req, res, next) => {
//   try {
//     const Bookmark = await bookmark.update(
//       {
//         contentName: req.body.bookmarkName,
//         URL: req.body.bookmarkURL,
//       },
//       {
//         where: { id: req.body.id },
//       }
//     );
//     res.redirect("/");
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
//   next();
// };

const deleteMemo: RequestHandler = async (req, res, next) => {
  try {
    const d_id = req.body.id;
    const deleteMemo = await memo.destroy({ where: { id: d_id } });
  } catch (error) {
    console.error(error);
    next(error);
  }
  res.status(200).end();
};

// export { createMemo, /*renderContent,*/ deleteMemo, /*updateContent*/ };
export { createMemo };
