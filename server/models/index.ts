export * from "./sequelize";
import User, { associate as associateUser } from "./user";
import Bookmark, { associate as associateBookmark } from "./bookmark";
import Comment, { associate as associateComment } from "./comment";
import Hashtag, { associate as associateHashtag } from "./hashtag";
import Image, { associate as associateImage } from "./image";
import Post, { associate as associatePost } from "./post";
import Schedule, { associate as associateSchedule } from "./schedule";

/* Export */
export * from "./sequelize";

/* Relationship */
const db = {
  Bookmark,
  Comment,
  Hashtag,
  Image,
  Post,
  Schedule,
  User,
};

export type dbType = typeof db;

associateBookmark(db);
associateComment(db);
associateHashtag(db);
associateImage(db);
associatePost(db);
associateSchedule(db);
associateUser(db);
