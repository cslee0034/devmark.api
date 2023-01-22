import express from "express";
export const api = express.Router();

/* Import route */
import { info } from "./info.js";
import { user } from "./user.js"

api.use('/info', info)
api.use('/user', user)