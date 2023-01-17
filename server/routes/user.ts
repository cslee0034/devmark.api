import express from "express";
import bcrypt from "bcrypt";
import { isNotLoggedIn } from "./middleware.js";
import User from "../models/user.js";
// const passport = require("passport");
export const user = express.Router();

user.post("/registration", isNotLoggedIn, async (req, res, next) => {
  const { email, nick, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.redirect("/join?error=exist");
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      nick,
      password: hash,
    });
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    return next(error);
  }
});
