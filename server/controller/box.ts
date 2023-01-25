import { RequestHandler } from "express";
import multer from "multer";
import path from "path";
import Box from "../models/Box.js";
// tsc 변환시 대문자로 바뀌는 문제가 있었음

const imgUpload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads/");
      // upload to uploads folder
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
      // add file date
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

const createBox: RequestHandler = async (req, res, next) => {
  try {
    const box = await Box.create({
      box: req.body.box,
      img: req.body.url,
      UserId: req.user!.id,
    });
    res.redirect("/");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

/* Render */
const renderBox: RequestHandler = async (req, res, next) => {
  try {
    const UserId = req.user!.id;
    const userBox = await Box.findAll({ where: { UserId } });
    if (!userBox) {
      return res.end();
    } else {
      res.json(userBox);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export { imgUpload, createBox, renderBox };
