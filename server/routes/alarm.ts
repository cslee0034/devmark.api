import express from "express";
import {
  createAlarm,
  deleteAlarm,
  notifyAlarm,
  renderAlarm,
} from "../controller/alarm.js";
import { isLoggedIn } from "../middleware/middleware.js";
export const alarm = express.Router();

/* Post /api/alarm */
alarm.post("/", isLoggedIn, createAlarm);

/* Get /api/alarm */
alarm.get("/", isLoggedIn, renderAlarm);

/* Delete /api/alarm */
alarm.delete("/", isLoggedIn, deleteAlarm);

/* Get /api/alarm/notification */
alarm.get("/notification", isLoggedIn, notifyAlarm);
