import express from "express";
export const info = express.Router();

info.get("/", (req, res) => {
  const userInfo = res.locals!.user;
  userInfo.password = "";
  res.send(userInfo);
});
