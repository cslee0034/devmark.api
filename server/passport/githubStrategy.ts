import passport from "passport";
import { Strategy as GithubStrategy } from "passport-github";

import User from "../models/user";

export default () => {
  passport.use(
    new GithubStrategy(
      {
        clientID: process.env.GITHUB_ID!,
        clientSecret: process.env.GITHUB_SECRET!,
        callbackURL: "/api/user/github/callback",
      },
      async (accessToken, refreshToken, profile: any, done) => {
        console.log("github profile", profile);
        try {
          const exUser = await User.findOne({
            where: { snsId: profile.id, provider: "github" },
          });
          if (exUser) {
            done(null, exUser);
          } else {
            const { id, name, email } = profile._json;
            const newUser = await User.create({
              email: email ? email : null,
              // 설정에 따라 이메일이 있을 수도 있고 없을 수도 있다
              nick: name,
              snsId: id,
              provider: "github",
            });
            done(null, newUser);
          }
        } catch (error) {
          console.error(error);
          done(error as unknown as Error);
        }
      }
    )
  );
};
