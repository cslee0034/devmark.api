import express from "express";
import {
  createContent,
  deleteContent,
  renderContent,
  updateContent,
} from "../controller/content.js";
import { findUserBox } from "../middleware/checkUserBox.js";
import { isLoggedIn } from "../middleware/middleware.js";
export const content = express.Router();

/* Post /api/content */
content.post("/", isLoggedIn, createContent);

/* Get /api/content */
content.get("/", isLoggedIn, findUserBox, renderContent);

/* Patch /api/content */
content.patch("/", isLoggedIn, updateContent);

/* Delete /api/content */
content.delete("/", isLoggedIn, deleteContent);
