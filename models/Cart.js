const mongoose = require('mongoose');
const CartSchema = mongoose.Schema({
    is_active: Boolean,
    modified_on: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    },
    menuItems: [{
        menuItem: {
            type: mongoose.Types.ObjectId,
            ref: 'menuitems'
        },
        quantity: Number
    }]

});


module.exports = mongoose.model('Carts', CartSchema);