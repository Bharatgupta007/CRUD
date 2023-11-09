const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    breweryId: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    username: {
        type: String,
        required: true
    }
});

const Review = mongoose.model("Review", reviewSchema,'review');

module.exports = Review;