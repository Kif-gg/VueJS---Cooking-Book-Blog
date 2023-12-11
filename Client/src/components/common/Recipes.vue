<template>
    <SearchRecipe></SearchRecipe>

    <Loader v-if="isLoading"></Loader>

    <main class="catalog" v-else>

        <section v-if="isAdmin">
            <RouterLink to="/secret-path/admin/recipes/create">
                <button type="button" class="add-submit-btn">Add new recipe</button>
            </RouterLink>
        </section>
        <template v-if="recipes.length > 0">
            <section class="content">
                <UniversalRecipeCard v-for="recipe in recipes" :key="recipe._id" :_id="recipe._id" :imgUrl="recipe.imgUrl"
                    :name="recipe.name" :category="recipe.category" :reviews="recipe.reviews"></UniversalRecipeCard>
            </section>
        </template>
        <template v-else>
            <h3>There are no recipes yet! Please come back later!</h3>
        </template>
    </main>
</template>

<script>
import { RouterLink } from 'vue-router';
import { getAllRecipes } from '../../services/recipeService';
import { useAuthenticatedStore } from '../../stores/authenticated';
import { verifyString } from '../../util/pseudoHasher';
import SearchRecipe from './SearchRecipe.vue';
import UniversalRecipeCard from './UniversalRecipeCard.vue';
import { useRecipesStore } from '../../stores/recipes';
import Loader from './Loader.vue';
export default {
    components: { SearchRecipe, UniversalRecipeCard, RouterLink, Loader },
    data() {
        return {
            isAdmin: verifyString("supersecret", useAuthenticatedStore().user),
            isLoading: true
        }
    },
    async created() {
        try {
            const recipes = await getAllRecipes();
            useRecipesStore().setRecipes(recipes);
        } catch (error) {
            alert(error.message);
        } finally {
            this.isLoading = false;
        }
    },
    computed: {
        recipes() {
            return useRecipesStore().recipes
        }
    }
}
</script>