const { getAllRecipes, getRecipesFiltered, getRecipeById, addRecipeToFavorites, removeRecipeFromFavorites } = require("../Services/recipeService");
const { parseError } = require("../Util/errorParser");
const { allowUsersOnly } = require("../Middlewares/guard");
const { postOrEditReview, deleteReview, getReviewById } = require("../Services/reviewService");
const { getUserById } = require("../Services/userService");

const recipeController = require("express").Router();

recipeController.get("/", async (req, res) => {
    try {
        let recipes;
        if (Object.keys(req.body).length > 0) {
            recipes = await getRecipesFiltered(req.body)
        } else {
            recipes = await getAllRecipes();
        }
        res.json(recipes);
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

recipeController.get("/:id", async (req, res) => {
    try {
        const recipeDetails = await getRecipeById(req.params.id);
        res.json(recipeDetails);
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

recipeController.post("/:id", allowUsersOnly(), async (req, res) => {
    try {
        const user = await getUserById(req.user._id);
        const recipeDetails = await getRecipeById(req.params.id);
        const review = postOrEditReview(user, recipeDetails, req.body);
        const DASHBOARD = req.app.locals.DASHBOARD;
        DASHBOARD.reviewsDashboard.totalPosted.unshift(new Date(Date.now()));
        await DASHBOARD.save();
        res.status(201).json(review);
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

recipeController.put("/:id/:reviewId", allowUsersOnly(), async (req, res) => {
    try {
        const user = await getUserById(req.user._id);
        const recipeDetails = await getRecipeById(req.params.id);
        const reviewToEdit = await getReviewById(req.params.reviewId);
        const editedReview = postOrEditReview(user, recipeDetails, req.body, reviewToEdit);
        res.json(editedReview);
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

recipeController.delete("/:id/:reviewId", allowUsersOnly(), async (req, res) => {
    try {
        const user = await getUserById(req.user._id);
        const recipeDetails = await getRecipeById(req.params.id);
        const reviewToDelete = await getReviewById(req.params.reviewId);
        await deleteReview(user, recipeDetails, reviewToDelete);
        const DASHBOARD = req.app.locals.DASHBOARD;
        DASHBOARD.reviewsDashboard.totalDeleted.unshift(new Date(Date.now()));
        await DASHBOARD.save();
        res.status(204).end();
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

recipeController.post("/:id/favorite", async (req, res) => {
    try {
        const user = await getUserById(req.user._id);
        const recipe = await getRecipeById(req.params.id);
        await addRecipeToFavorites(user, recipe);
        res.status(201).end();
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

recipeController.delete("/:id/favorite", async (req, res) => {
    try {
        const user = await getUserById(req.user._id);
        const recipe = await getRecipeById(req.params.id);
        await removeRecipeFromFavorites(user, recipe);
        res.status(204).end();
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

module.exports = recipeController;