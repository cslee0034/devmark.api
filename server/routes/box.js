"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.box = void 0;
const express_1 = __importDefault(require("express"));
const middleware_js_1 = require("../middleware/middleware.js");
const box_js_1 = require("../controller/box.js");
const fs_1 = __importDefault(require("fs"));
exports.box = express_1.default.Router();
try {
    fs_1.default.readdirSync("uploads");
}
catch (error) {
    console.error("uploads 폴더가 없어 uploads 폴더를 생성");
    fs_1.default.mkdirSync("uploads");
}
/* Post /bookmark/api/box/img */
exports.box.post("/img", middleware_js_1.isLoggedIn, box_js_1.imgUpload.single("img"), 
// login한 사람이 post하면 upload함.
// post 처음 인수 "/img"와 single의 인수 img의 key가 일치해야함.
(req, res) => {
    var _a;
    console.log(req.file); // 업로드한 결과물이 req.file안에 적혀있을 것.
    res.json({ url: `/img/${(_a = req.file) === null || _a === void 0 ? void 0 : _a.filename}` });
    // 업로드 완료되면 url을 프론트로 돌려줌.
    // 파일 주소는 uploads인데 요청 주소는 img가 된다.
    // 이것을 처리해주는 것이 express.static
});
/* Post /bookmark/api/box */
exports.box.post("/", middleware_js_1.isLoggedIn, box_js_1.imgUpload.none(), box_js_1.createBox);
/* Get /bookmark/api/box/page */
exports.box.get("/page", middleware_js_1.isLoggedIn, box_js_1.renderBox);
