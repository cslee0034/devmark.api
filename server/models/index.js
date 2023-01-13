"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
exports.__esModule = true;
__exportStar(require("./sequelize"), exports);
var user_1 = require("./user");
var bookmark_1 = require("./bookmark");
var comment_1 = require("./comment");
var hashtag_1 = require("./hashtag");
var image_1 = require("./image");
var post_1 = require("./post");
var schedule_1 = require("./schedule");
/* Export */
__exportStar(require("./sequelize"), exports);
/* Relationship */
var db = {
    Bookmark: bookmark_1["default"],
    Comment: comment_1["default"],
    Hashtag: hashtag_1["default"],
    Image: image_1["default"],
    Post: post_1["default"],
    Schedule: schedule_1["default"],
    User: user_1["default"]
};
(0, bookmark_1.associate)(db);
(0, comment_1.associate)(db);
(0, hashtag_1.associate)(db);
(0, image_1.associate)(db);
(0, post_1.associate)(db);
(0, schedule_1.associate)(db);
(0, user_1.associate)(db);
