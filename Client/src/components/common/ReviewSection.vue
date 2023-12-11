<template>
    <section class="review-section">
        <div>
            <ReviewForm></ReviewForm>
        </div>
        <div>
            <template v-if="reviews.length > 0">
                <h3>Reviews</h3>

                <ReviewCard v-for="review in reviews" :key="review._id" :_id="review._id" :username="review.username"
                    :rating="review.rating" :comment="review.comment" :posted="review.createdAt"></ReviewCard>
            </template>
            <template v-else>
                <h3>There are no reviews for this recipe!</h3>
            </template>
        </div>
    </section>
</template>

<script>
import { useAuthenticatedStore } from '../../stores/authenticated';
import { useReviewsStore } from '../../stores/reviews';
import { verifyString } from '../../util/pseudoHasher';
import ReviewForm from '../user-only/ReviewForm.vue';
import ReviewCard from './ReviewCard.vue';

export default {
    components: { ReviewForm, ReviewCard },
    data() {
        return {
            isAdmin: verifyString("supersecret", useAuthenticatedStore().user),
        }
    },
    computed: {
        reviews() {
            return useReviewsStore().reviews
        }
    }
}
</script>