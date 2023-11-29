function allowGuestsOnly() {
    return (req, res, next) => {
        if (!req.user) {
            next();
        } else {
            res.status(400).json({ message: "You are already logged in!" });
        }
    };
};

function allowUsersOnly() {
    return (req, res, next) => {
        if (req.user && !req.user.pin && req.user.username) {
            next();
        } else {
            res.status(401).json({ message: "Log in is required!" });
        }
    };
};

function allowAdminsOnly() {
    return (req, res, next) => {
        if (req.user && req.user.pin && !req.user.username) {
            next();
        } else {
            res.status(400).json({ message: "You have no permission!" });
        }
    }
};

function allowAnyAuthenticated() {
    return (req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.status(400).json({ message: "Login is required!" });
        }
    }
};

module.exports = {
    allowGuestsOnly,
    allowUsersOnly,
    allowAdminsOnly,
    allowAnyAuthenticated
};