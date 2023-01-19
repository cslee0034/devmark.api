import express from "express";
export const info = express.Router();

info.get("/", (req, res) => {
  const userId = res.locals.user;
  res.send(userId);
});
