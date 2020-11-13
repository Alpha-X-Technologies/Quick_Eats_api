const mongoose = require('mongoose');

const RestaurantSchema = mongoose.Schema({
    name: String,
    priceRange: String,
    tel: String,
    email: String,
    openTimes: [{
        days: String,
        times: String
    }],
    categories: [{
        name: String
    }],
    hasMenu: Boolean,
    menu: [{
        type: mongoose.Types.ObjectId,
        ref: 'Menu'
    }],
    aggregateRating: Number,
    img: {
        data: Buffer,
        contentType: String
    }
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);