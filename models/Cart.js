const mongoose = require('mongoose');
const CartSchema = mongoose.Schema({
    is_active: Boolean,
    modified_on: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    menuItems: [{
        menuItem: {
            type: mongoose.Types.ObjectId,
            ref: 'MenuItem'
        },
        quantity: Number,
        discount_Amount: Schema.Types.Decimal128
    }],
    cart_Total: Schema.Types.Decimal128,
    total_Discount: Schema.Types.Decimal128

});


module.exports = mongoose.model('Carts', CartSchema);