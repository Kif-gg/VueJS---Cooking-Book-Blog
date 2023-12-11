<template>
    <Loader v-if="isLoading"></Loader>

    <main class="favorites" v-else>

        <h2>My favorite recipes</h2>

        <template v-if="favorites.length > 0">
            <section class="favorite-list">
                <UniversalRecipeCard v-for="recipe in favorites" :key="recipe._id" :_id="recipe._id" :imgUrl="recipe.imgUrl"
                    :name="recipe.name" :category="recipe.category" :reviews="recipe.reviews"></UniversalRecipeCard>
            </section>
        </template>

        <template v-else>
            <h3>You haven't added any recipes in Your favorites!</h3>
        </template>

    </main>
</template>

<script>
import { getFavorites } from '../../services/userService';
import { useRecipesStore } from '../../stores/recipes';
import Loader from '../common/Loader.vue';
import UniversalRecipeCard from '../common/UniversalRecipeCard.vue'
export default {
    components: { UniversalRecipeCard, Loader },
    data() {
        return {
            isLoading: true
        }
    },
    async created() {
        try {
            const recipes = await getFavorites();
            useRecipesStore().setRecipes(recipes);
        } catch (error) {
            alert(error.message);
        } finally {
            this.isLoading = false;
        }
    },
    computed: {
        favorites() {
            return useRecipesStore().recipes
        },
    }
}
</script>