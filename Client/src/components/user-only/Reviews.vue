<template>
    <Loader v-if="isLoading"></Loader>

    <main class="comments" v-else>
        <h2>My comments</h2>

        <template v-if="reviews.length > 0">
            <section class="comment-list">
                <article class="comments-per-day">
                    <RouterLink v-for="review in reviews" :key="review._id" :to="getRecipeLink(review)">Commented on
                        recipe <span>"{{ getRecipeName(review) }}"</span><time>
                            {{ formatTime(new Date(review.createdAt)) }}
                        </time></RouterLink>
                </article>
            </section>
        </template>

        <template v-else>
            <h3>You haven't posted any reviews yet!</h3>
        </template>
    </main>
</template>

<script>
import { getReviews } from '../../services/userService';
import { useReviewsStore } from '../../stores/reviews';
import { useRecipesStore } from '../../stores/recipes';
import { getAllRecipes } from '../../services/recipeService';
import { useAuthenticatedStore } from '../../stores/authenticated';
import { RouterLink } from 'vue-router';
import Loader from '../common/Loader.vue';

export default {
    components: { RouterLink, Loader },
    data() {
        return {
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            isLoading: true
        }
    },
    async created() {
        try {
            const reviews = await getReviews();
            useReviewsStore().setReviews(reviews);
            if (useRecipesStore().recipes.length <= 0) {
                const recipes = await getAllRecipes();
                useRecipesStore().setRecipes(recipes);
            }
        } catch (error) {
            alert(error.message);
        } finally {
            this.isLoading = false;
        }
    },
    computed: {
        reviews() {
            return useReviewsStore().reviews.filter(rev => rev.userId === useAuthenticatedStore().id).sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt);
            });
        },
        recipe(review) {
            const recipe = useRecipesStore().recipes.find(rec => rec.reviews.find(rev => rev._id === review._id));
            return recipe;
        }
    },
    methods: {
        getRecipeLink(review) {
            const recipes = useRecipesStore().recipes
            const recipe = recipes.find(rec => rec.reviews.find(rev => rev._id === review._id));
            return recipe ? `/recipes/${recipe._id}` : '/profile/reviews';
        },
        getRecipeName(review) {
            const recipe = useRecipesStore().recipes.find(rec => rec.reviews.find(rev => rev._id === review._id));
            return recipe ? recipe.name : null;
        },
        formatTime(dateTime) {
            const date = dateTime.getDate();
            const month = this.months[dateTime.getMonth()];
            const year = dateTime.getFullYear()
            const hours = dateTime.getHours().toString().padStart(2, '0');
            const minutes = dateTime.getMinutes().toString().padStart(2, '0');
            return `on ${date} ${month} ${year} at ${hours}:${minutes}`;
        }
    }
}
</script>