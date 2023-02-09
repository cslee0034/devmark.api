import { RequestHandler } from "express";
import Box from "../models/box";

const findUserBox: RequestHandler = async (req, res, next) => {
  const userId = req.user!.id;
  const boxId: any = req.query!.boxId;
  try {
    const box = await Box.findAll({ where: { UserId: userId } });

    // Box가 없어서 빈 배열로 온다면 끝낸다.
    if (box.length === 0) {
      res.status(200);
      res.end();
    }

    // Box를 검사하며 id가 일치하는 Bbox가 있다면 break
    // 없다면 끝낸다.
    for (let i = 0; i < box.length; i++) {
      if (box[i].dataValues.id == boxId) {
        break;
      } else {
        res.end();
      }
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
  next();
};

export { findUserBox };
