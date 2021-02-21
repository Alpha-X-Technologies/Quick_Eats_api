const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    sales_Ref: String,
    order_Time: Date,
    food_Ready: Boolean,
    order_Total: Number,
    order_Discount: Number,
    final_Price: Number,
    comment: String,
    total_Items: Number,
    restaurant_Id: {
        type: mongoose.ObjectId,
        ref: 'Restaurant'
    },
    user_Id: {
        type: mongoose.ObjectId,
        ref: 'User'
    },
    menu_Items: [{
        menuItem: {
            type: mongoose.Types.ObjectId,
            ref: 'MenuItem'
        },
        quantity: Number,
        name: String,
        price: Number
    }]

});

module.exports = mongoose.model('Order', OrderSchema);