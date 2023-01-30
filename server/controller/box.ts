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
    const newBox = await Box.create({
      box: req.body.box,
      img: req.body.url,
      UserId: req.user!.id,
    });
    res.status(201).end();
    // 아이템 생성 성공 Status 201
  } catch (error) {
    console.error(error);
    next(error);
  }
};

/* Render */
const renderBox: RequestHandler = async (req, res, next) => {
  try {
    const UserId = req.user!.id;
    const renderBox = await Box.findAll({ where: { UserId } });
    if (!renderBox) {
      return res.end();
    } else {
      res.status(200);
      res.json(renderBox);
      // 아이템 가져오기 성공 Status 200
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
  // 가장 마지막에 이미지를 지우기 때문에
  // status 200을 보내고 종료
  res.status(200).end();
};

const updateBox: RequestHandler = async (req, res, next) => {
  try {
    const updateBox = await Box.update(
      {
        box: req.body.box,
        img: req.body.url,
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

const deleteBox: RequestHandler = async (req, res, next) => {
  try {
    const d_id = req.body.id;
    const deleteBox = await Box.destroy({ where: { id: d_id } });
  } catch (error) {
    console.error(error);
    next(error);
  }
  next();
};

export { imgUpload, createBox, renderBox, imgDelete, updateBox, deleteBox };
