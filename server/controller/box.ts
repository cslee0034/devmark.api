import express, { RequestHandler } from "express";
import multer from "multer";
import path from "path";
import Box from "../models/box.js";

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
      UserId: req.body.userId
    });
    res.redirect("/");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export { imgUpload, createBox };
