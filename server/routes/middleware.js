/* isLoggedIn */
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.status(401).send("login required");
    }
};
/* isNotLoggedIn */
const isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    }
    else {
        res.status(401).send("cannot approach after login");
    }
};
export { isLoggedIn, isNotLoggedIn };
