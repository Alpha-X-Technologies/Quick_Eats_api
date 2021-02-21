const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    menu: {
        type: mongoose.Types.ObjectId,
        ref: 'Menu'
    },
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
    picture_url: String,
    categories: [{
        type: mongoose.Types.ObjectId,
        ref: 'MenuCategory'
    }],
    //TODO need to make sure that menu items can also be added as menu items so we need to amend the type to maybe use discriminators or 
    //use mixed type
    extra_items: [{
        type: mongoose.Types.ObjectId,
        ref: 'MenuItemExtra'
    }]
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

ItemSchema.pre('save', function(next) {
    var item = this;

    // only hash the password if it has been modified (or is new)
    if (!item.isModified('ratings')) return next();

    item.aggregateRating = () => {
        var totalStars = (item.ratings.star1 * 1) + (item.ratings.star2 * 2) + (item.ratings.star3 * 3) + (item.ratings.star4 * 4) + (item.ratings.star5 * 5);
        var totalCount = item.ratings.star1 + item.ratings.star2 + item.ratings.star3 + item.ratings.star4 + item.ratings.star5;
        return totalStars / totalCount
    }
    next();
});



module.exports = mongoose.model('MenuItem', ItemSchema);