const { isValidObjectId } = require("mongoose");
const Review = require("../Models/Review");

async function postOrEditReview(user, recipe, formData, reviewFromEditMode) {
    if (reviewFromEditMode) {
        const recipeHasReview = recipe.find(review => review._id == reviewFromEditMode._id);
        if (!recipeHasReview) {
            throw new Error(`Recipe with ID ${recipe._id} does not have a review with ID ${review._id}!`);
        }
        const userPostedReview = user.find(review => review.userId == user._id);
        if (!userPostedReview) {
            throw new Error(`User with ID ${user._id} did not post a review with ID ${review._id}!`);
        }
    }

    let errorStack = "";
    const { rating, comment } = formData;
    if (!rating) {
        errorStack += "Rating is required before posting review!\r\n";
    } else if (rating < 1) {
        errorStack += "Score must not be lower 1!\r\n";
    } else if (rating > 5) {
        errorStack += "Score must not be higher than 5!\r\n";
    }
    if (!comment) {
        errorStack += "Comment is required before posting review!\r\n";
    } else if (comment.length < 3) {
        errorStack += "Comment length must be at least 3 characters!\r\n";
    } else if (comment.length > 300) {
        errorStack += "Comment length must not exceed 300 characters!\r\n";
    }

    if (reviewFromEditMode) {
        if (reviewFromEditMode.rating == rating && reviewFromEditMode.comment == comment) {
            errorStack += "You must change at least 1 field!\r\n";
        }
    }

    if (errorStack.length > 0) {
        throw new Error(errorStack);
    }

    if (reviewFromEditMode) {
        reviewFromEditMode.rating = rating;
        reviewFromEditMode.comment = comment;
        return reviewFromEditMode.save();
    }

    const review = await Review.create({
        userId: user._id,
        rating: Number(rating),
        comment
    });

    user.reviews.unshift(review);
    user.save();
    recipe.reviews.unshift(review);
    recipe.save();
    return review;
};

async function deleteReview(user, recipe, reviewToDelete) {
    const recipeHasReview = recipe.find(review => review._id == reviewToDelete._id);
    if (!recipeHasReview) {
        throw new Error(`Recipe with ID ${recipe._id} does not have a review with ID ${review._id}!`);
    }
    const userPostedReview = user.find(review => review.userId == user._id);
    if (!userPostedReview) {
        throw new Error(`User with ID ${user._id} did not post a review with ID ${review._id}!`);
    }
    return Review.findByIdAndDelete(reviewToDelete._id);
};

async function getReviewById(id) {
    if (isValidObjectId(id)) {
        throw new Error("Invalid review ID!");
    }
    const review = await Review.findById(id);
    if (!review) {
        throw new Error(`Review with ID ${id} does not exist!`);
    }
    return review;
}

module.exports = {
    postOrEditReview,
    deleteReview,
    getReviewById
};