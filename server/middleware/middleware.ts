import { RequestHandler } from "express";

/* isLoggedIn */
const isLoggedIn: RequestHandler = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.send({ Error: "Login required" });
    return;
  }
};

/* isNotLoggedIn */
const isNotLoggedIn: RequestHandler = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.send({ Error: "Already loggedin" });
    return;
  }
};

export { isLoggedIn, isNotLoggedIn };
