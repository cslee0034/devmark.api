import express from "express";
import { createFeed, scrapOg } from "../controller/feed.js";
import { isLoggedIn } from "../middleware/middleware.js";
export const feed = express.Router();

/* Post /api/content */
feed.post("/", isLoggedIn, scrapOg, createFeed);

/* Get /api/content */
// feed.get("/", isLoggedIn, renderContent);

/* Patch /api/content */
// feed.patch("/", isLoggedIn, updateContent);

/* Delete /api/content */
// feed.delete("/", isLoggedIn, deleteContent);
