const mongoose = require('mongoose');

const RestaurantSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    description: String,
    address: String,
    contactNumber: String,
    //have a campus property for now that we might change in the future
    campus: String,
    trading_hours:[{
        day:String,
        unavailable:String,
        times:String
    }],
    // openTimes: [{
    //     days: String,
    //     times: String
    // }],
    // closingTimes: [{
    //     days: String,
    //     times: String
    // }],
    // categories: [{
    //     name: String
    // }],
    isTakingOrders: {
        type: Boolean,
        default: true
    },
    menus: [{
        type: mongoose.Types.ObjectId,
        ref: 'Menu'
    }],
    aggregateRating: Number,
    number_reviews:Number,
    img: {
        data: Buffer,
        contentType: String
    },
    updated_at: Date,
    created_at: Date,
    vendor_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Vendor'
    }
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);