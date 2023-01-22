import { RequestHandler } from "express";

/* isLoggedIn */
const isLoggedIn: RequestHandler = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403);
    res.json({ Error: "Login required" });
    return;
  }
};

/* isNotLoggedIn */
const isNotLoggedIn: RequestHandler = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.json({ Error: "Already loggedin" });
    return;
  }
};

export { isLoggedIn, isNotLoggedIn };
