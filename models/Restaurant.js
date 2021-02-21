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
    trading_hours: [{
        day: Number,
        available: {
            type: Boolean,
            default: true
        },
        times: String
    }],
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
    ratings: {
        star1: {
            type: Number,
            default: 0
        },
        star2: {
            type: Number,
            default: 0
        },
        star3: {
            type: Number,
            default: 0
        },
        star4: {
            type: Number,
            default: 0
        },
        star5: {
            type: Number,
            default: 0
        },
    },
    aggregateRating: Number,
    img: {
        data: Buffer,
        contentType: String
    },
    vendor_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Vendor'
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

RestaurantSchema.pre('save', function(next) {
    var restaurant = this;

    // only hash the password if it has been modified (or is new)
    if (!restaurant.isModified('ratings')) return next();

    restaurant.aggregateRating = () => {
        var totalStars = (restaurant.ratings.star1 * 1) + (restaurant.ratings.star2 * 2) + (restaurant.ratings.star3 * 3) + (restaurant.ratings.star4 * 4) + (restaurant.ratings.star5 * 5);
        var totalCount = restaurant.ratings.star1 + restaurant.ratings.star2 + restaurant.ratings.star3 + restaurant.ratings.star4 + restaurant.ratings.star5;
        return totalStars / totalCount
    }
    next();
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);