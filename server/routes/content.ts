import express from "express";
import { createContent, deleteContent, renderContent, updateContent } from "../controller/content.js";
import { isLoggedIn } from "../middleware/middleware.js";
export const content = express.Router();

/* Post /bookmark/api/content */
content.post("/", isLoggedIn, createContent);

/* Post /bookmark/api/content/update */
content.post('/update', isLoggedIn, updateContent)

/* Delete /bookmark/api/content/delete */
content.delete("/delete", isLoggedIn, deleteContent)

/* Get /bookmark/api/box/page */
content.get("/page", isLoggedIn, renderContent);