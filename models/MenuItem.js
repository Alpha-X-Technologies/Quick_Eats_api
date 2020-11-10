const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
    name: String,
    Price: Number,
    date: {
        type: Date,
        default: Date.now
    },
    menu: [{
        type: mongoose.Types.ObjectId,
        ref: 'Menu'
    }],
    ratings: [{
        summary: String,
        detail: String,
        numberOfStars: Number,
        created: {
            type: Date,
            default: Date.now
        }
    }],
    img: {
        data: Buffer,
        contentType: String
    }
});

module.exports = mongoose.model('MenuItem', ItemSchema);