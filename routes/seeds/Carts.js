const mongoose = require('mongoose');


//connect to db

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
const Cart = mongoose.model('carts', CartSchema);

const makeCart = async() => {
    const cart = new Cart({
        user: '5fa6aaf1d4cfc654ecc5e47b',
        is_active: true,
        modified_on: new Date(),
        menuItems: [{
            menuItem: '5fba1faab51b6e2658f3774e',
            quantity: 1
        }]
    })

    const res = await cart.save()
    console.log(res)
}

makeCart();