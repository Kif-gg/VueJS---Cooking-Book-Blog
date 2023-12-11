<template>
    <div class="comment-card">

        <EditDeleteReview v-if="isUserOwner" :review="review"></EditDeleteReview>

        <h4>{{ username }}</h4>
        <span>
            <svg v-for="star in showStars" class="star" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                <path
                    d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
            </svg>
        </span>
        <p class="long-text">{{ comment }}</p>
        <p>Posted on <time>{{ date }} {{ month }} {{ year }}</time> at <time>{{ hours < 10 ? "0" + hours : hours }}:{{
            minutes < 10 ? "0" + minutes : minutes }}</time>
        </p>
    </div>
</template>

<script>
import { useAuthenticatedStore } from '../../stores/authenticated';
import { useReviewsStore } from '../../stores/reviews';
import EditDeleteReview from '../user-only/EditDeleteReview.vue';

export default {
    components: { EditDeleteReview },
    props: {
        _id: String,
        username: String,
        rating: Number,
        comment: String,
        posted: String
    },
    data() {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const dateObj = new Date(this.posted);
        return {
            date: dateObj.getDate(),
            month: months[dateObj.getMonth()],
            year: dateObj.getFullYear(),
            minutes: dateObj.getMinutes(),
            hours: dateObj.getHours(),
        }
    },
    computed: {
        showStars() {
            const arr = [];
            for (let i = 0; i < this.rating; i++) {
                arr.push('star');
            }
            return arr;
        },
        isUserOwner() {
            if (useAuthenticatedStore().id) {
                const review = useReviewsStore().reviews.find(rev => rev.userId === useAuthenticatedStore().id);
                if (review) {
                    return review._id === this._id;
                }
            }
            return false;
        },
        review() {
            return { _id: this._id, username: this.username, rating: this.rating, comment: this.comment, posted: this.posted }
        }
    }
}
</script>