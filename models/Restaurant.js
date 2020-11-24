const mongoose = require('mongoose');

const RestaurantSchema = mongoose.Schema({
    name: String,
    description: String,
    address: String,
    email: String,
    openTimes: [{
        days: String,
        times: String
    }],
    closingTimes: [{
        days: String,
        times: String
    }],
    categories: [{
        name: String
    }],
    isTakingOrders: Boolean,
    menu: [{
        type: mongoose.Types.ObjectId,
        ref: 'Menu'
    }],
    aggregateRating: Number,
    img: {
        data: Buffer,
        contentType: String
    },
    vendor_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Vendor'
    }
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);