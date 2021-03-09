const mongoose = require('mongoose');
const CartSchema = mongoose.Schema({
    total_discount: mongoose.Types.Decimal128,
    total: mongoose.Types.Decimal128,
    number_items: Number,
    cart_items: [{
        menu_item: {
            type: mongoose.Types.ObjectId,
            ref: 'MenuItem',
            required: true
        },
        quantity: Number,
        discount_Amount: Number, // discount on a menu item will probably be a %
        menu_extra_items: [{
            type: mongoose.Types.ObjectId,
            ref: 'MenuItemExtra'
        }]
    }],
    is_active: Boolean,
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },

}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

CartSchema.set('toJSON', {
    getters: true,
    transform: (doc, ret) => {
        if (ret.total) {
            ret.total = ret.total.toString();
        }
        if (ret.total_discount) {
            ret.total_discount = ret.total_discount.toString();
        }
        delete ret.__v;
        return ret;
    }
})


module.exports = mongoose.model('Cart', CartSchema);