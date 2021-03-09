const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    restaurant: {
        type: mongoose.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    readableOrderId: String,
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cart: {
        type: mongoose.Types.ObjectId,
        ref: 'Cart'
    },
    rating: {
        type: mongoose.Types.ObjectId,
        ref: 'Rating'
    },
    // OrderStatus {
    //     notStarted=0
    //     submitted=1 which is when payment is successful
    //     accepted=2
    //     complete=3
    //     fetched=4
    //     cancelled=5
    //     }
    progress: {
        type: Number,
        default: 0
    },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('Order', OrderSchema);