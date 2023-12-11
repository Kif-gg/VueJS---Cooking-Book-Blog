<template>
    <form @submit.prevent="onReviewSubmit" v-if="isAuthenticated">
        <h3>Rate dish</h3>
        <div class="radio-stars">
            <input type="radio" name="rating" id="5" value="5" v-model="formData.rating">
            <label for="5">
                <svg class="star" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                    <path
                        d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                </svg>
            </label>

            <input type="radio" name="rating" id="4" value="4" v-model="formData.rating">
            <label for="4">
                <svg class="star" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                    <path
                        d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                </svg>
            </label>

            <input type="radio" name="rating" id="3" value="3" v-model="formData.rating">
            <label for="3">
                <svg class="star" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                    <path
                        d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                </svg>
            </label>

            <input type="radio" name="rating" id="2" value="2" v-model="formData.rating">
            <label for="2">
                <svg class="star" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                    <path
                        d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                </svg>
            </label>

            <input type="radio" name="rating" id="1" value="1" v-model="formData.rating">
            <label for="1">
                <svg class="star" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                    <path
                        d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                </svg>
            </label>
        </div>

        <div>
            <label for="comment">
                <h3>Add comment</h3>
                <textarea name="comment" id="comment" rows="10" placeholder="Your comment here..."
                    v-model="formData.comment"
                    @blur="onBlurValidateField(formData.comment, validateComment, 'comment', $event)"></textarea>

                <p class="error">...</p>
            </label>
        </div>
        <button type="submit" class="add-submit-btn" :disabled="validateBeforeSubmit" v-if="!isEditModeOn">Submit
            review</button>
        <button type="submit" class="edit-cancel-btn" v-else>Edit review</button>
    </form>
</template>

<script>
import { editReview, postReview } from '../../services/recipeService';
import { useAuthenticatedStore } from '../../stores/authenticated';
import { useReviewsStore } from '../../stores/reviews';
import { useRecipesStore } from '../../stores/recipes';
import { verifyString } from '../../util/pseudoHasher';
import { validateComment } from '../../util/validator';
import { useEditModeStore } from '../../stores/editMode';

export default {
    data() {
        return {
            isAuthenticated: verifyString("regularsecret", useAuthenticatedStore().user),
            formData: {
                rating: 0,
                comment: ''
            },
            errorStack: {
                rating: 1,
                comment: 1
            },

        }
    },
    methods: {
        async onReviewSubmit() {
            try {
                if (useEditModeStore().editMode) {
                    if (confirm("Are You sure You want to edit Your review?")) {
                        const result = await editReview(useRecipesStore().currentRecipe._id, useReviewsStore().currentReview._id, this.formData);
                        useEditModeStore().disableEditMode();
                        this.formData = {};
                        Array.from(document.getElementsByClassName("valid")).map(e => e.classList.remove("valid"));
                        useReviewsStore().reviews.splice(useReviewsStore().reviews.findIndex(rev => rev._id === result._id), 1, result);
                        return result;
                    }
                } else {
                    const result = await postReview(useRecipesStore().currentRecipe._id, this.formData);
                    this.formData = {};
                    Array.from(document.getElementsByClassName("valid")).map(e => e.classList.remove("valid"));
                    useReviewsStore().reviews.unshift(result);
                    return result;
                }
            } catch (error) {
                alert(error.message);
            }
        },
        validateComment,
        onBlurValidateField(value, validationFunction, errValue, event) {
            let validRating = false;
            if (this.formData.rating > 0 && this.formData.rating < 6) {
                validRating = true;
            }
            if (validationFunction(value) === true && validRating) {
                event.currentTarget.classList.add("valid");
                event.currentTarget.classList.remove("invalid");
                event.currentTarget.nextSibling.style.display = "none";
                event.currentTarget.nextSibling.textContent = "";
                this.errorStack[errValue] = 0;
                this.errorStack.rating = 0;
            } else {
                event.currentTarget.classList.add("invalid");
                event.currentTarget.classList.remove("valid");
                event.currentTarget.nextSibling.style.display = "block";
                event.currentTarget.nextSibling.textContent = validationFunction(value) == true ? "" : validationFunction(value);
                if (!validRating) {
                    event.currentTarget.nextSibling.textContent += " Please select a star for the rating!";
                    this.errorStack.rating = 1;
                }
                this.errorStack[errValue] = 1;
            }
        }
    },
    computed: {
        validateBeforeSubmit() {
            if (Object.values(this.errorStack).every(v => v <= 0)) {
                return false;
            }
            return true;
        },
        isEditModeOn() {
            return useEditModeStore().editMode;
        }
    },
    watch: {
        isEditModeOn() {
            if (this.isEditModeOn == true) {
                this.formData.rating = useReviewsStore().currentReview.rating;
                this.formData.comment = useReviewsStore().currentReview.comment;
            }
        }
    }
}
</script>