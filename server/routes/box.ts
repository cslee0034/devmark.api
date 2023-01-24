import express from "express";
import { isLoggedIn } from "../middleware/middleware.js";
import { createBox, imgUpload } from "../controller/box.js";
import fs from "fs";

export const box = express.Router();

try {
  fs.readdirSync("uploads");
} catch (error) {
  console.error("uploads 폴더가 없어 uploads 폴더를 생성");
  fs.mkdirSync("uploads");
}

/* Post /bookmark/api/box/img */
box.post(
  "/img",
  /*isLoggedIn,*/
  imgUpload.single("file"),
  // login한 사람이 post하면 upload함.
  // post 처음 인수 "/img"와 single의 인수 img의 key가 일치해야함.
  (req, res) => {
    console.log(req.file); // 업로드한 결과물이 req.file안에 적혀있을 것.
    res.json({ url: `/img/${req.file!.filename}` });
    // 업로드 완료되면 url을 프론트로 돌려줌.
    // 파일 주소는 uploads인데 요청 주소는 img가 된다.
    // 이것을 처리해주는 것이 express.static
  }
);

/* Post /bookmark/api/box */
box.post("/", isLoggedIn, createBox);
