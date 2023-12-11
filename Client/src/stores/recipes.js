import { defineStore } from "pinia";

export const useRecipesStore = defineStore("recipes", {
    state: () => ({ recipes: [], currentRecipe: {} }),
    actions: {
        setRecipes(recipes) {
            this.recipes = recipes;
        },
        setCurrentRecipe(recipe) {
            this.currentRecipe = recipe;
        }
    }
});