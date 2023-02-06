import express, { ErrorRequestHandler } from "express";
import { Request } from "express";
import morgan from "morgan";
import expressSession from "express-session";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import passport from "passport";
import hpp from "hpp";
import helmet from "helmet";
import cors from "cors";

import passportConfig from "./passport/index.js";
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

/* PassportConfig */
passportConfig();

/* Sequelize */
sequelize
  .sync({ force: true })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
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

/* Cors Option */
let corsOptions = {
  origin: process.env.CLIENT_HOST,
  credentials: true,
};

/* Middlewares */
app.use(cors<Request>(corsOptions));
app.use("/", express.static("public"));
app.use("/img", express.static("uploads"));
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

/* User info */
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

/* Router */
app.use("/api", api);

/* ErrorHandler */
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);
  // res.locals.message = err.message;
  // res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.json({ Error: err.message });
};
app.use(errorHandler);

export default app;
