const mongoose = require('mongoose');
//connect to db

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





const Order = mongoose.model('orders', OrderSchema);



//6015239f72539c85a875383f
const makeOrder = async() => {
    const orderItem = new Order({
        sales_Ref: 'CC1',
        order_time: new Date(), //get this from database,
        user_Id: '5fa6aaf1d4cfc654ecc5e47b', //get that from logged in token
        food_Ready: true,
        restaurant_Id: '6015239f72539c85a875383f',
        order_Total: 30,
        order_Discount: 0,
        final_Price: 30,
        total_Items: 1,
        comment: 'Delicious',
        menu_Items: [{
                menuItem: '5fba1faab51b6e2658f3774e',
                quantity: 1,
                name: 'Cheese Burger',
                price: 30
            }] //get these items from database by ID but they will be passed through in production

    })

    const res = await orderItem.save()
    console.log(res)
}

makeOrder();