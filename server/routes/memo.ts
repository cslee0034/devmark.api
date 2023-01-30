import express from "express";
import { createMemo } from "../controller/memo.js";
import { isLoggedIn } from "../middleware/middleware.js";
export const memo = express.Router();

/* Post /api/memo */
memo.post("/", isLoggedIn, createMemo);

// /* Get /api/memo */
// // memo.get("/", isLoggedIn, renderMemo);

// /* Patch /api/memo */
// // memo.patch("/", isLoggedIn, updateMemo);

// /* Delete /api/memo */
// memo.delete("/", isLoggedIn, deleteMemo);

