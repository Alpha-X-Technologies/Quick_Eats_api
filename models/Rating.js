const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
    feedback: String,
    rating: Number,
    restaurant: {
        type: mongoose.Types.ObjectId,
        ref: 'Restaurant',
        required: false
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    menu_item: {
        type: mongoose.Types.ObjectId,
        ref: 'MenuItem',
        required: false
    }
});

module.exports = mongoose.model("Rating", RatingSchema);