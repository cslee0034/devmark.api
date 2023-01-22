"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNotLoggedIn = exports.isLoggedIn = void 0;
/* isLoggedIn */
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.status(403);
        res.json({ Error: "Login required" });
        return;
    }
};
exports.isLoggedIn = isLoggedIn;
/* isNotLoggedIn */
const isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    }
    else {
        res.json({ Error: "Already loggedin" });
        return;
    }
};
exports.isNotLoggedIn = isNotLoggedIn;
