"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const passport_1 = __importDefault(require("passport"));
const hpp_1 = __importDefault(require("hpp"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const index_js_1 = __importDefault(require("./passport/index.js"));
const route_hub_js_1 = require("./routes/route-hub.js");
const index_js_2 = require("./models/index.js");
/* Dotenv */
dotenv_1.default.config();
/* Express */
const app = (0, express_1.default)();
/* Prod */
const prod = process.env.NODE_ENV === "production";
/* Port */
app.set("port", prod ? process.env.PORT : 5000);
/* PassportConfig */
(0, index_js_1.default)();
/* Sequelize */
index_js_2.sequelize
    .sync({ force: false })
    .then(() => {
    console.log("데이터베이스 연결 성공");
})
    .catch((err) => {
    console.error(err);
});
/* Morgan, Hpp, Helmet */
if (prod) {
    app.use((0, hpp_1.default)());
    app.use((0, helmet_1.default)());
    app.use((0, morgan_1.default)("combined"));
}
else {
    app.use((0, morgan_1.default)("dev"));
}
/* Cors Option */
let corsOptions = {
    origin: process.env.CLIENT_HOST,
    credentials: true,
};
/* Middlewares */
app.use((0, cors_1.default)(corsOptions));
app.use("/", express_1.default.static("public"));
app.use("/img", express_1.default.static("uploads"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)(process.env.COOKIE_SECRET));
app.use((0, express_session_1.default)({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
        // 배포시 https사용하도록 설정하고 true로
        domain: prod ? "dev-mark.com" : undefined,
    },
    name: "session-cookie",
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
/* User info */
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});
/* Router */
app.use("/api", route_hub_js_1.api);
/* ErrorHandler */
const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
    res.status(err.status || 500);
    res.render("error");
};
app.use(errorHandler);
exports.default = app;
