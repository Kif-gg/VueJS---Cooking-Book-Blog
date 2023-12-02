const { register, login, logout, changeEmail, changePassword, deleteUser, getUserById } = require("../Services/userService");
const { parseError } = require("../Util/errorParser");
const { allowGuestsOnly, allowUsersOnly, allowAnyAuthenticated } = require("../Middlewares/guard");

const userController = require("express").Router();

userController.post("/register", allowGuestsOnly(), async (req, res) => {
    try {
        const token = await register(req.body);
        res.cookie("AUTHORIZATION", token.accessToken, { httpOnly: true });
        res.json(token);
    } catch (error) {
        const message = parseError(error);
        res.cookie("AUTHORIZATION", "alabala", { maxAge: 0 });
        res.status(400).json({ message });
    }
});

userController.post("/login", allowGuestsOnly(), async (req, res) => {
    try {
        const token = await login(req.body);
        res.cookie("AUTHORIZATION", token.accessToken, { httpOnly: true });
        res.json(token);
    } catch (error) {
        const message = parseError(error);
        res.cookie("AUTHORIZATION", "alabala", { maxAge: 0 });
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
        if (!user) {
            throw new Error(`User with ID ${req.user._id} does not exist!`);
        }
        res.status(200).json(user);
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

userController.put("/profile", allowUsersOnly(), async (req, res) => {
    try {
        const user = await getUserById(req.user._id);
        if (!user) {
            throw new Error(`User with ID ${req.user._id} does not exist!`);
        }
        const fieldsToUpdate = Object.keys(req.body);
        if (fieldsToUpdate.includes("email")) {
            const result = await changeEmail(user, req.body);
            res.status(200).json(result);
        } else if (fieldsToUpdate.includes("password")) {
            const result = await changePassword(user, req.body);
            res.status(200).json(result);
        } else {
            throw new Error("Wrong input data!");
        }
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

userController.delete("/profile", allowUsersOnly(), async (req, res) => {
    try {
        const user = await getUserById(req.user._id);
        if (!user) {
            throw new Error(`User with ID ${req.user._id} does not exist!`);
        }
        await deleteUser(user, req.body)
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

module.exports = userController;