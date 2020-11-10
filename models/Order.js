const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    name: String,
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    progress: String
});

module.exports = mongoose.model('Order', OrderSchema);