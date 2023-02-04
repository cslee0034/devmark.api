import express from "express";
import { createMemo, deleteMemo, renderMemo, renderMemoEach, updateMemo } from "../controller/memo.js";
import { isLoggedIn } from "../middleware/middleware.js";
export const memo = express.Router();

/* Post /api/memo */
memo.post("/", isLoggedIn, createMemo);

// /* Get /api/memo */
memo.get("/", isLoggedIn, renderMemo);

// /* Get /api/memo/each */
memo.get("/each", isLoggedIn, renderMemoEach);

// /* Patch /api/memo */
memo.patch("/", isLoggedIn, updateMemo);

// /* Delete /api/memo */
memo.delete("/", isLoggedIn, deleteMemo);
