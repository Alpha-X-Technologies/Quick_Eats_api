const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
    name: String,
    price: Number,
    itemDescription: String,
    date: {
        type: Date,
        default: Date.now
    },
    reviews: [{
        type: mongoose.Types.ObjectId,
        ref: 'Review'
    }],
    img: {
        data: Buffer,
        contentType: String
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'MenuCategory'
    },
    customizationDetails: [{
        type: mongoose.Types.ObjectId,
        ref: 'InventoryItem'
    }]
});

module.exports = mongoose.model('MenuItem', ItemSchema);