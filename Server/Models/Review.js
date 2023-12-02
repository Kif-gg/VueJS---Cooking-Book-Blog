const { Schema, model, Types: { ObjectId } } = require("mongoose");

const reviewSchema = new Schema({
    userId: {
        type: ObjectId,
        ref: "User"
    },
    rating: {
        type: Number,
        required: [true, "Rating is required before posting review!"],
        min: [1, "Rating must not be lower than 1!"],
        max: [5, "Rating must not be higher than 5!"]
    },
    comment: {
        type: String,
        required: [true, "Comment is required before posting review!"],
        minLength: [3, "Comment length must be at least 3 characters!"],
        maxLength: [300, "Comment length must not exceed 300 characters!"]
    }
}, { timestamps: { createdAt: "createdAt" } })

const Review = model("Review", reviewSchema);

module.exports = Review;