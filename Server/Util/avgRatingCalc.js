function calcAvgRating(arrayReviews) {
    if (arrayReviews.length == 0) {
        return 0;
    }
    return averageRating = arrayReviews.reduce((sum, review) => sum + review.rating, 0) / arrayReviews.length;
};

module.exports = {
    calcAvgRating
};