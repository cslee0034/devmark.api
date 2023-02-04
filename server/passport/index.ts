import passport from "passport";
import local from "./localStrategy.js";
import kakao from "./kakaoStrategy.js";
import github from "./githubStrategy.js";
import User from "../models/user.js";
import Box from "../models/box.js";

export default () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id: number, done) => {
    User.findOne({
      where: { id },
      include: [
        {
          model: Box,
          attributes: ["id"],
          as: "Boxes",
        },
      ],
    })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });

  local();
  kakao();
  github();
};
