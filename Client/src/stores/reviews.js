import { defineStore } from "pinia";

export const useReviewsStore = defineStore("reviews", {
    state: () => ({ reviews: [], currentReview: {} }),
    actions: {
        setReviews(reviews) {
            this.reviews = reviews;
        },
        setCurrentReview(review) {
            this.currentReview = review;
        }
    }
});