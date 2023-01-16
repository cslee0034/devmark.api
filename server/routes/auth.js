"use strict";
// import * as express from "express";
// import * as bcrypt from "bcrypt";
// import { isLoggedIn } from "./middleware";
// import User from "../models/user";
// const router = express.Router();
// router.get("/", isLoggedIn, (req, res) => {
//   const user = req.user!.toJSON() as User;
//   return res.json({ ...user, password: null });
//   // User info without password
// });
// router.post("/", async (req, res, next) => {
//   console.log(req.body)
//   try {
//     const exUser = await User.findOne({
//       where: {
//         email: req.body.email,
//       },
//     });
//     if (exUser) {
//       return res.status(403).send("ID already using");
//     }
//     const HPassword = await bcrypt.hash(req.body.password, 12);
//     const newUser = await User.create({
//       email: req.body.email,
//       password: req.body.HPassword,
//       nickname: req.body.nickname,
//     });
//     return res.status(200).json(newUser);
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// });
// module.exports = router;
