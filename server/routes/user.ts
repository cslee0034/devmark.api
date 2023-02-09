import express from "express";
import passport from "passport";
import { isLoggedIn, isNotLoggedIn } from "../middleware/middleware.js";
import { registration, login, logout, updateUser, deleteUser } from "../controller/auth.js";

export const user = express.Router();

/* Post /auth/api/user/registration */
user.post("/registration", isNotLoggedIn, registration);

/* Post /auth/api/user/login */
user.post("/login", isNotLoggedIn, login);

/* Post /auth/api/user/logout */
user.post("/logout", isLoggedIn, logout);

/* Patch /auth/api/user/ */
user.patch("/", isLoggedIn, updateUser)

/* Delete /auth/api/user */
user.delete("/", isLoggedIn, deleteUser)

/* GET /auth/api/user/kakao */
user.get("/kakao", passport.authenticate("kakao"));

/* GET /auth/api/user/kakao/callback */
user.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureMessage: "cannot use kakao login",
  }),
  (req, res) => {
    res.redirect("http://localhost:3000/redirect");
  }
);

/* GET /auth/api/user/github */
user.get("/github", passport.authenticate("github"));

/* GET /auth/api/user/kakao/callback */
user.get(
  "/github/callback",
  passport.authenticate("github", {
    failureMessage: "cannot use github login",
  }),
  (req, res) => {
    res.redirect("http://localhost:3000/redirect");
  }
);
