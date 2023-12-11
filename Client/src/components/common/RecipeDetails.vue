<template>
    <Loader v-if="isLoading"></Loader>

    <main class="details" v-else>
        <section class="content">
            <article>
                <img :src="recipe.imgUrl" alt="Dish photo">
                <h3>{{ recipe.name }}</h3>
                <p>Category: {{ recipe.category }}</p>
                <p>
                    {{ reviewScore.toFixed(1) }}
                    <svg class="star" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                        <path
                            d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                    </svg>
                    from {{ reviews.length }} users

                </p>
                <template v-if="!isAdmin && isAuthenticated">
                    <button class="add-submit-btn" type="button" v-if="!isInUserFavorites" @click="addToFavorites">
                        <svg class="add-favorite" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                            <path
                                d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" />
                        </svg>
                        Add to favorites
                    </button>
                    <button class="delete-btn" type="button" v-else @click="removeFromFavorites">
                        <svg class="remove-favorite" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                            <path
                                d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                        </svg>
                        Remove from favorites
                    </button>
                </template>
                <p class="long-text">{{ recipe.description }}</p>
            </article>

            <article>
                <h3>Products needed</h3>
                <ul>
                    <li v-for="product in recipe.productsNeeded">{{ product }}</li>
                </ul>
            </article>

            <article>
                <h3>Way of cooking</h3>
                <p class="long-text">{{ recipe.instructions }}</p>
            </article>

            <article v-if="isAdmin">
                <RouterLink :to="'/secret-path/admin/recipes/' + id + '/edit'" @click="enableEditMode">
                    <button class="edit-cancel-btn">Edit recipe</button>
                </RouterLink>
                <button type="button" class="delete-btn" @click="deleteRecipe">Delete recipe</button>
            </article>
        </section>

        <ReviewSection :reviews="reviews"></ReviewSection>
    </main>
</template>

<script>
import { RouterLink } from 'vue-router';
import { addRecipeToFavorites, getRecipeById, removeRecipeFromFavorites } from '../../services/recipeService';
import { getFavorites } from '../../services/userService';
import { useAuthenticatedStore } from '../../stores/authenticated';
import { useEditModeStore } from '../../stores/editMode';
import { useRecipesStore } from '../../stores/recipes';
import { useReviewsStore } from '../../stores/reviews';
import { verifyString } from '../../util/pseudoHasher';
import ReviewSection from './ReviewSection.vue';
import { deleteRecipe } from '../../services/adminService';
import Loader from './Loader.vue';

export default {
    components: { ReviewSection, RouterLink, Loader },
    data() {
        return {
            id: this.$route.params.id,
            isAdmin: verifyString("supersecret", useAuthenticatedStore().user),
            isAuthenticated: useAuthenticatedStore().authenticated,
            isInUserFavorites: false,
            isLoading: true
        }
    },
    async created() {
        try {
            const recipe = await getRecipeById(this.id);
            useRecipesStore().setCurrentRecipe(recipe);
            this.recipe.imgUrl = recipe.imgUrl;
            this.recipe.name = recipe.name;
            this.recipe.category = recipe.category;
            this.recipe.description = recipe.description;
            this.recipe.productsNeeded = recipe.productsNeeded;
            this.recipe.instructions = recipe.instructions;
            useReviewsStore().setReviews(recipe.reviews);

            if (!this.isAdmin && this.isAuthenticated) {
                const favorites = await getFavorites();
                const isInFavs = !!favorites.find(recipe => recipe._id === this.id);
                this.isInUserFavorites = isInFavs;
            }

            return recipe;

        } catch (error) {
            alert(error.message);
        } finally {
            this.isLoading = false;
        }
    },
    computed: {
        recipe() {
            return {
                imgUrl: '',
                name: '',
                category: '',
                description: '',
                productsNeeded: '',
                instructions: '',
            }
        },
        reviewScore() {
            let stars = 0;
            let users = this.reviews.length;
            if (users == 0) {
                return 0;
            }
            stars = this.reviews.reduce((total, rev) => total + rev.rating, 0) / users;
            return stars;
        },
        reviews() {
            return useReviewsStore().reviews;
        }
    },
    methods: {
        async addToFavorites() {
            try {
                await addRecipeToFavorites(this.id);
                this.isInUserFavorites = true;
                return;
            } catch (error) {
                alert(error.message);
            }
        },
        async removeFromFavorites() {
            try {
                await removeRecipeFromFavorites(this.id);
                this.isInUserFavorites = false;
                return;
            } catch (error) {
                alert(error.message);
            }
        },
        async deleteRecipe() {
            try {
                if (confirm("Are You sure You want to DELETE this recipe?\r\nTHIS CAN'T BE UNDONE!!!")) {
                    await deleteRecipe(this.id);
                    return this.$router.replace("/recipes");
                }
            } catch (error) {
                alert(error.message);
            }
        },
        enableEditMode() {
            useEditModeStore().enableEditMode();
        }
    }
}
</script>