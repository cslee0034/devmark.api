/* isLoggedIn */
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.send({ Error: "Login required" });
        return;
    }
};
/* isNotLoggedIn */
const isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    }
    else {
        res.send({ Error: "Already loggedin" });
        return;
    }
};
export { isLoggedIn, isNotLoggedIn };
