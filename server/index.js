"use strict";
exports.__esModule = true;
var express = require("express");
// if (!export default) => import * as ...
var morgan = require("morgan");
var cookieParser = require("cookie-parser");
var expressSession = require("express-session");
var dotenv = require("dotenv");
var passport = require("passport");
var hpp = require("hpp");
var helmet_1 = require("helmet");
var models_1 = require("./models");
/* Dotenv */
dotenv.config();
/* Express */
var app = express();
/* Prod */
var prod = process.env.NODE_ENV === "production";
/* Port */
app.set("port", prod ? process.env.PORT : 5000);
/* Sequelize */
models_1.sequelize
    .sync({ force: true })
    // 서버 재시작마다 테이블 초기화 여부
    .then(function () {
    console.log("데이터베이스 연결 성공");
})["catch"](function (err) {
    // 기본적 JS에러
    // 이후에 인터페이스 늘어나면 타입을 확장을 해야할
    console.error(err);
});
/* Morgan, Hpp, Helmet */
if (prod) {
    app.use(hpp());
    app.use((0, helmet_1["default"])());
    app.use(morgan("combined"));
}
else {
    app.use(morgan("dev"));
}
/* Middlewares */
app.use("/", express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
        // 배포시 https사용하도록 설정하고 true로
        domain: prod ? "dev-mark.com" : undefined
    },
    name: "session-cookie"
}));
app.use(passport.initialize());
app.use(passport.session());
/* Router */
var test = require("./routes/test.js");
var auth = require("./routes/auth.js");
app.use("/api", test);
app.use("/auth", auth);
/* Listen */
app.listen(app.get("port"), function () {
    console.log("Listening on port ".concat(app.get("port")));
});
