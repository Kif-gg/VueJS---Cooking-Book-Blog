const { getRecipeById } = require("../Services/recipeService");
const { parseError } = require("../Util/errorParser");
const { createOrEditRecipe, deleteRecipe, getAllUsers, getUsersFiltered, deleteUser, editUser, getDashboard, login, logout } = require("../Services/adminService");
const { getUserById } = require("../Services/userService");
const { allowGuestsOnly, allowAdminsOnly } = require("../Middlewares/guard");

const adminController = require("express").Router();

adminController.post("/login", allowGuestsOnly(), async (req, res) => {
    try {
        const admin = await login(req.body);
        res.cookie("AUTHORIZATION", admin.accessToken, { httpOnly: true, sameSite: "lax" });
        res.json(admin);
    } catch (error) {
        const message = parseError(error);
        res.cookie("AUTHORIZATION", "alabala", { maxAge: 0, sameSite: "lax" });
        res.status(400).json({ message });
    }
});

adminController.get("/logout", allowAdminsOnly(), async (req, res) => {
    try {
        await logout(req.token);
        res.clearCookie("AUTHORIZATION");
        res.status(204).end();
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

adminController.get("/dashboard", allowAdminsOnly(), async (req, res) => {
    try {
        const DASHBOARD = await getDashboard();
        res.json(DASHBOARD);
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

adminController.post("/recipes", allowAdminsOnly(), async (req, res) => {
    try {
        const newRecipe = await createOrEditRecipe(req.body);
        const DASHBOARD = req.app.locals.DASHBOARD;
        DASHBOARD.recipesDashboard.totalCreated.unshift(new Date(Date.now()));
        await DASHBOARD.save();
        res.status(201).json(newRecipe);
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

adminController.put("/recipes/:id", allowAdminsOnly(), async (req, res) => {
    try {
        const recipeToEdit = await getRecipeById(req.params.id);
        const editedRecipe = await createOrEditRecipe(req.body, recipeToEdit);
        res.json(editedRecipe);
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

adminController.delete("/recipes/:id", allowAdminsOnly(), async (req, res) => {
    try {
        const recipeToDelete = await getRecipeById(req.params.id);
        const result = await deleteRecipe(recipeToDelete);
        const DASHBOARD = req.app.locals.DASHBOARD;
        for (let i = 0; i < result; i++) {
            DASHBOARD.reviewsDashboard.totalDeleted.unshift(new Date(Date.now()));
        }
        DASHBOARD.recipesDashboard.totalDeleted.unshift(new Date(Date.now()));
        await DASHBOARD.save();
        res.status(204).end();
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

adminController.get("/users", allowAdminsOnly(), async (req, res) => {
    try {
        let users;
        if (Object.keys(req.query).length > 0) {
            users = await getUsersFiltered(req.query);
        } else {
            users = await getAllUsers();
        }
        res.json(users);
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

adminController.put("/users/:id", allowAdminsOnly(), async (req, res) => {
    try {
        const user = await getUserById(req.params.id);
        const editedUser = await editUser(user, req.body);
        res.json(editedUser);
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

adminController.delete("/users/:id", allowAdminsOnly(), async (req, res) => {
    try {
        const user = await getUserById(req.params.id);
        const result = await deleteUser(user);
        const DASHBOARD = req.app.locals.DASHBOARD;
        for (let i = 0; i < result; i++) {
            DASHBOARD.reviewsDashboard.totalDeleted.unshift(new Date(Date.now()));
        }
        DASHBOARD.usersDashboard.totalDeleted.unshift(new Date(Date.now()));
        await DASHBOARD.save();
        res.status(204).end();
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

module.exports = adminController;