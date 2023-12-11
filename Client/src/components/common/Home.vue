<template>
    <Loader v-if="isLoading"></Loader>

    <main class="landing-page" v-else>
        <template v-if="recipes.length > 0">
            <h2>Check out these three random recipes!</h2>
            <section>
                <UniversalRecipeCard v-for="recipe in recipes" :key="recipe._id" :_id="recipe._id" :imgUrl="recipe.imgUrl"
                    :name="recipe.name" :category="recipe.category" :reviews="recipe.reviews"></UniversalRecipeCard>
            </section>
        </template>
        <template v-else>
            <h2>There is nothing to show now!</h2>
        </template>
    </main>
</template>

<script>
import UniversalRecipeCard from "./UniversalRecipeCard.vue";
import { getHomeRecipes } from "../../services/recipeService";
import { useRecipesStore } from "../../stores/recipes";
import Loader from "./Loader.vue";
export default {
    components: { UniversalRecipeCard, Loader },
    data() {
        return {
            recipes: [],
            isLoading: true
        }
    },
    async created() {
        try {
            this.recipes = await getHomeRecipes();
            useRecipesStore().setRecipes(this.recipes);
        } catch (error) {
            alert(error.message);
        } finally {
            this.isLoading = false;
        }
    }
}
</script>