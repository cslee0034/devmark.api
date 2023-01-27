import { RequestHandler } from "express";
import fs from "fs";
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

const imgDelete: RequestHandler = async (req, res, next) => {
  if (req.body.d_url === "/img/default") {
    /* default 이미지라면 지우지 않는다 */
    next();
  }
  if (req.body.d_url) {
    let url = req.body.d_url;
    /* 파일 경로 재지정 */
    url = url.replace("/img/", "./uploads/");
    try {
      fs.unlinkSync(url);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
  next();
};

const updateBox: RequestHandler = async (req, res, next) => {
  try {
    const box = await Box.update(
      {
        box: req.body.box,
        img: req.body.url,
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

const deleteBox: RequestHandler = async (req, res, next) => {
  try {
    const d_id = req.body.id;
    const box = await Box.destroy({ where: { id: d_id } });
  } catch (error) {
    console.error(error);
    next(error);
  }
  next();
};

export { imgUpload, createBox, renderBox, imgDelete, updateBox, deleteBox };
