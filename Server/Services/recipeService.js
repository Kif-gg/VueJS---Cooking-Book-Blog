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
    if (direction.toLowerCase() != "descending") {
        direction = "ascending";
    }

    const searchMatch = new RegExp(createRegExp(search), "is");
    const categoryMatch = new RegExp(category, "i");

    return Recipe
        .find({ category: categoryMatch })
        .or([{ "name": searchMatch }, { "description": searchMatch }, { "productsNeeded": searchMatch }, { "instructions": searchMatch }])
        .sort({ [criteria]: direction })
        .populate("reviews");
};

async function getRecipeById(id) {
    return Recipe.findById(id).populate("reviews");
};

module.exports = {
    getThreeRandomRecipes,
    getAllRecipes,
    getRecipesFiltered,
    getRecipeById
};