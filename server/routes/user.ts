import express from "express";
import { isLoggedIn, isNotLoggedIn } from "../middleware/middleware.js";
import { registration, login, logout } from "../controller/auth.js";

export const user = express.Router();

/* Post /auth/api/user/registration */
user.post("/registration", isNotLoggedIn, registration);

/* Post /auth/api/user/login */
user.post("/login", isNotLoggedIn, login);

user.post('/logout', isLoggedIn, logout);