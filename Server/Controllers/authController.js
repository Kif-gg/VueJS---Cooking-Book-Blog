const { register, login, logout, changeEmail, changePassword, deleteUser, getUserById } = require("../Services/userService");
const { parseError } = require("../Util/errorParser");
const { allowGuestsOnly, allowUsersOnly, allowAdminsOnly } = require("../Middlewares/guard");

const authController = require("express").Router();

authController.post("/register", allowGuestsOnly(), async (req, res) => {
    try {
        const token = await register(req.body.username, req.body.email, req.body.password, req.body.repass);
        res.cookie("AUTHORIZATION", token.accessToken, { httpOnly: true });
        res.json(token);
    } catch (error) {
        const message = parseError(error);
        res.cookie("AUTHORIZATION", "alabala", { maxAge: 0 });
        res.status(400).json({ message });
    }
});

authController.post("/login", allowGuestsOnly(), async (req, res) => {
    try {
        const token = await login(req.body.username, req.body.password);
        res.cookie("AUTHORIZATION", token.accessToken, { httpOnly: true });
        res.json(token);
    } catch (error) {
        const message = parseError(error);
        res.cookie("AUTHORIZATION", "alabala", { maxAge: 0 });
        res.status(400).json({ message });
    }
});