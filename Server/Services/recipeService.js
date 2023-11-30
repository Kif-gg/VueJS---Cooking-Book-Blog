const Recipe = require("../Models/Recipe");
const { createRegExp } = require("../Util/regexGenerator");

async function getAllRecipes() {
    const recipes = await Recipe.find({}).populate("reviews").sort({ name: 1 });
    return recipes;
};

async function getRecipesFiltered(formData) {
    try {
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

        const recipes = await Recipe
            .find({ category: categoryMatch })
            .or([{ "name": searchMatch }, { "description": searchMatch }, { "productsNeeded": searchMatch }, { "instructions": searchMatch }])
            .sort({ [criteria]: direction })
            .populate("reviews");
        return recipes;
    } catch (error) {
        throw error;
    }
};