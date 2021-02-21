const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    //get the order date from the createdAt timestamp
    // date: {
    //     type: Date,
    //     default: Date.now
    // },
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
        discount: Number,
        total: mongoose.Types.Decimal128,
        number_items: Number,
        cart_items: [{
            menu_item: {
                type: mongoose.Types.ObjectId,
                ref: 'MenuItem',
                required: true
            },
            quantity: Number,
            menu_extra_items: [{
                type: mongoose.Types.ObjectId,
                ref: 'MenuItemExtra'
            }]
        }]
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