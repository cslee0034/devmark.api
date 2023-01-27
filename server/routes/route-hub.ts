import express from "express";
export const api = express.Router();

/* Import route */
import { info } from "./info.js";
import { user } from "./user.js";
import { box } from "./box.js";
import { content } from "./content.js";

api.use("/info", info);
api.use("/user", user);
api.use("/box", box);
api.use("/content", content);
