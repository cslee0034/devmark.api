import express from "express";
export const api = express.Router();

/* Import route */
import { test } from "./temp.js";
import { user } from "./user.js"

api.use('/test', test)
api.use('/user', user)