import express from "express";
import morgan from "morgan";
import expressSession from "express-session";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import passport from "passport";
import hpp from "hpp";
import helmet from "helmet";

import { api } from "./routes/route-hub.js";
import { sequelize } from "./models/index.js";

/* Dotenv */
dotenv.config();

/* Express */
const app = express();

/* Prod */
const prod: boolean = process.env.NODE_ENV === "production";

/* Port */
app.set("port", prod ? process.env.PORT : 5000);

/* Sequelize */
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err: Error) => {
    console.error(err);
  });

/* Morgan, Hpp, Helmet */
if (prod) {
  app.use(hpp());
  app.use(helmet());
  app.use(morgan("combined"));
} else {
  app.use(morgan("dev"));
}

/* Middlewares */
app.use("/", express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET!,
    cookie: {
      httpOnly: true,
      secure: false,
      // 배포시 https사용하도록 설정하고 true로
      domain: prod ? "dev-mark.com" : undefined,
    },
    name: "session-cookie",
  })
);
app.use(passport.initialize());
app.use(passport.session());

/* Router */
app.use("/api", api);

/* Listen */
app.listen(app.get("port"), () => {
  console.log(`Listening on port ${app.get("port")}`);
});
