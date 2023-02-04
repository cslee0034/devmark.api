import express from "express";
import { createAlarm, deleteAlarm, renderAlarm } from "../controller/alarm.js";
import { isLoggedIn } from "../middleware/middleware.js";
export const alarm = express.Router();

/* Post /api/content */
alarm.post("/", isLoggedIn, createAlarm);

/* Get /api/content */
alarm.get("/", isLoggedIn, renderAlarm);

/* Delete /api/content */
alarm.delete("/", isLoggedIn, deleteAlarm);
