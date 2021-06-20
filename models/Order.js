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
    //     submitted=0
    //     paid=2 which is when payment is successful
    //     accepted=1
    //     complete=3
    //     fetched=4
    //     rejected=5
    //     cancelled=6
    //     }
    progress: {
        type: Number,
        default: 0
    },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

OrderSchema.post('save', function(doc, next) {
    doc.populate({
        path: 'restaurant',
        populate: {
            path: 'menus',
            model: 'Menu'
        }
    }).populate({
        path: 'cart',
        populate: {
            path: 'cart_items',
            populate: [{
                path: 'menu_item',
                populate: {
                    path: 'extra_items',
                    populate: {
                        path: 'group',
                        model: 'MenuItemExtraGroup'
                    }
                }
            }, {
                path: 'menu_extra_items',
                populate: {
                    path: 'group'
                }
            }]
        }
    }).execPopulate().then(function() {
        next();
    })
})

module.exports = mongoose.model('Order', OrderSchema);