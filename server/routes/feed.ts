import express from "express";
import { createFeed, deleteFeed, renderFeeds, scrapOg, updateImg } from "../controller/feed.js";
import { isLoggedIn } from "../middleware/middleware.js";
export const feed = express.Router();

/* Post /api/content */
feed.post("/", isLoggedIn, createFeed, scrapOg, updateImg);

/* Get /api/content */
feed.get("/", isLoggedIn, renderFeeds);

/* Delete /api/content */
feed.delete("/", isLoggedIn, deleteFeed);
