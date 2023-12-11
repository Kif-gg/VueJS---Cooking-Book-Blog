const { isValidObjectId } = require("mongoose");
const Recipe = require("../Models/Recipe");
const { createRegExp } = require("../Util/regexGenerator");

async function getThreeRandomRecipes() {
    const result = await Recipe.aggregate().sample(3);
    return Recipe.populate(result, { path: "reviews" });
};

async function getAllRecipes() {
    return Recipe.find({}).populate("reviews").sort({ name: 1 });
};

async function getRecipesFiltered(formData) {
    let { search, category, criteria, direction } = formData;
    if (!search) {
        search = "";
    }
    if (!category || category.toLowerCase() == "all") {
        category = ""
    }
    if (!criteria || (criteria.toLowerCase() != "name" && criteria.toLowerCase() != "rating")) {
        criteria = "name";
    }
    if (!direction || direction.toLowerCase() != "descending") {
        direction = "ascending";
    }

    const searchMatch = new RegExp(createRegExp(search), "is");
    const categoryMatch = new RegExp(category, "i");

    return Recipe
        .find({ category: categoryMatch })
        .or([{ "name": searchMatch }, { "description": searchMatch }, { "productsNeeded": { $in: [searchMatch] } }, { "instructions": searchMatch }])
        .sort({ [criteria]: direction })
        .populate("reviews");
};

async function getRecipeById(id) {
    if (!isValidObjectId(id)) {
        throw new Error("Invalid recipe ID!");
    }
    const recipe = await Recipe.findById(id).populate("reviews");
    if (!recipe) {
        throw new Error(`Recipe with ID ${id} does not exist!`);
    }
    return recipe;
};

async function addRecipeToFavorites(user, recipe) {
    const hasInFavorites = user.favorites.find(favorite => favorite._id.toString() == recipe._id.toString());
    if (hasInFavorites) {
        throw new Error("You already added this recipe to Your favorites!");
    }
    user.favorites.unshift(recipe);
    return user.save();
}

async function removeRecipeFromFavorites(user, recipe) {
    const hasInFavorites = user.favorites.find(favorite => favorite._id.toString() == recipe._id.toString());
    if (!hasInFavorites) {
        throw new Error("You haven't added this recipe to Your favorites!");
    }
    user.favorites.splice(user.favorites.findIndex(recipe => recipe._id.toString() == hasInFavorites._id.toString()), 1);
    return user.save();
}

module.exports = {
    getThreeRandomRecipes,
    getAllRecipes,
    getRecipesFiltered,
    getRecipeById,
    addRecipeToFavorites,
    removeRecipeFromFavorites
};