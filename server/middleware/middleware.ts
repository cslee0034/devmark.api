import { RequestHandler } from "express";

/* isLoggedIn */
const isLoggedIn: RequestHandler = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    // 허가되지 않은 요청 -> status code 403
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
    res.status(401);
    res.json({ Error: "Already loggedin" });
    return;
  }
};

export { isLoggedIn, isNotLoggedIn };
