const { getThreeRandomRecipes } = require("../Services/recipeService");
const { parseError } = require("../Util/errorParser");

const homeController = require("express").Router();

homeController.get("/", async (req, res) => {
    try {
        const homeRecipes = await getThreeRandomRecipes();
        res.json(homeRecipes);
    } catch (error) {
        const message = parseError(error);
        res.status(400).json({ message });
    }
});

module.exports = homeController;