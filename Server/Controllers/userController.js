const { register, login, logout, changeEmail, changePassword, deleteUser, getUserById } = require("../Services/userService");
const { parseError } = require("../Util/errorParser");
const { allowGuestsOnly, allowUsersOnly, allowAnyAuthenticated } = require("../Middlewares/guard");

const userController = require("express").Router();

userController.post("/register", allowGuestsOnly(), async (req, res) => {
    try {
        const token = await register(req.body);
        const DASHBOARD = req.app.locals.DASHBOARD;
        DASHBOARD.usersDashboard.totalRegistered.unshift(new Date(Date.now()));
        await DASHBOARD.save();
        res.cookie("AUTHORIZATION", token.accessToken, { httpOnly: true, sameSite: "lax" });
        res.status(201).json(token);
    } catch (error) {
        const message = parseError(error);
        res.cookie("AUTHORIZATION", "alabala", { maxAge: 0, sameSite: "lax" });
        res.status(400).json({ message });
    }
});

userController.post("/login", allowGuestsOnly(), async (req, res) => {
    try {
        const token = await login(req.body);
        res.cookie("AUTHORIZATION", token.accessToken, { httpOnly: true, sameSite: "lax" });
        res.json(token);
    } catch (error) {
        const message = parseError(error);
        res.cookie("AUTHORIZATION", "alabala", { maxAge: 0, sameSite: "lax" });
        res.status(400).json({ message });
    }
});

userController.get("/logout", allowAnyAuthenticated(), async (req, res) => {
    try {
        const token = req.token;
        await logout(token);
        res.clearCookie("AUTHORIZATION");
        res.status(204).end();
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

userController.get("/profile", allowUsersOnly(), async (req, res) => {
    try {
        const user = await getUserById(req.user._id);
        res.json(user);
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

userController.get("/profile/favorites", allowUsersOnly(), async (req, res) => {
    try {
        const user = await (await getUserById(req.user._id)).populate("favorites");
        const favorites = user.favorites;
        res.json(favorites);
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

userController.get("/profile/reviews", allowUsersOnly(), async (req, res) => {
    try {
        const user = await (await getUserById(req.user._id)).populate("reviews");
        const reviews = user.reviews;
        res.json(reviews);
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

userController.put("/profile", allowUsersOnly(), async (req, res) => {
    try {
        const fieldsToUpdate = Object.keys(req.body);
        const user = await getUserById(req.user._id);
        let result;
        if (fieldsToUpdate.includes("oldEmail") && fieldsToUpdate.includes("newEmail") && fieldsToUpdate.includes("reEmail")) {
            result = await changeEmail(user, req.body);
        } else if (fieldsToUpdate.includes("oldPassword") && fieldsToUpdate.includes("newPassword") && fieldsToUpdate.includes("repass")) {
            result = await changePassword(user, req.body);
        } else {
            throw new Error("Wrong input data!");
        }
        res.json(result);
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

userController.delete("/profile", allowUsersOnly(), async (req, res) => {
    try {
        const user = await getUserById(req.user._id);
        await deleteUser(user, req.body);
        const DASHBOARD = req.app.locals.DASHBOARD;
        DASHBOARD.usersDashboard.totalDeleted.unshift(new Date(Date.now()));
        await DASHBOARD.save();
        res.status(204).end();
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

module.exports = userController;