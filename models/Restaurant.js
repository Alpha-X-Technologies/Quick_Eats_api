const mongoose = require('mongoose');

const RestaurantSchema = mongoose.Schema({
    name: String,
    priceRange: String,
    tel: String,
    url: String,
    location: String,
    email: String,
    openTimes: [{
        times: String
    }],
    categories: [{
        name: String
    }],
    hasMenu: Boolean,
    aggregateRating: {
        ratingValue: String,
        reviewCount: Number
    },
    img: {
        data: Buffer,
        contentType: String
    }
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);