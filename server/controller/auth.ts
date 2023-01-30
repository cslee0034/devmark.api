import bcrypt from "bcrypt";
import passport from "passport";
import User from "../models/user.js";
import { RequestHandler } from "express";

/* registration */
const registration: RequestHandler = async (req, res, next) => {
  const { email, nick, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.send({ Error: "Account already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 12);
    await User.create({
      email,
      nick,
      password: hashPassword,
    });
    return res.status(201).end();
    // 생성 성공 Status 201 
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

/* login */
const login: RequestHandler = (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.status(401).json({ Error: info.message });
      // 로그인 실패 Status 401
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.status(200).end();
      // 로그인 성공 200 OK
    });
  })(req, res, next);
};

/* logout */
const logout: RequestHandler = (req, res) => {
  req.logout(() => {
    res.status(200).end();
    // 로그아웃 성공 200 OK
  });
};

export { registration, login, logout };
