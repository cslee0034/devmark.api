"use strict";
exports.__esModule = true;
exports.isNotLoggedIn = exports.isLoggedIn = void 0;
/* isLoggedIn */
var isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.status(401).send("login required");
    }
};
exports.isLoggedIn = isLoggedIn;
/* isNotLoggedIn */
var isNotLoggedIn = function (req, res, next) {
    if (!req.isAuthenticated()) {
        next();
    }
    else {
        res.status(401).send("cannot approach after login");
    }
};
exports.isNotLoggedIn = isNotLoggedIn;
