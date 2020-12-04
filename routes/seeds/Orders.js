const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    salesOrderRef: String,
    store: {
        type: mongoose.ObjectId,
        ref: 'Restaurant'
    },
    userId: {
        type: mongoose.ObjectId,
        ref: 'User'
    },
    lineItems: [{
        type: mongoose.Types.ObjectId,
        ref: 'MenuItem'
    }]
});

//connect to db

const Order = mongoose.model('Order', OrderSchema);

const makeOrder = async() => {
    const orderItem = new Order({
        salesorderRef: 'Sliced Jalapeno',
        store: 32321, //get this from database,
        userId: 28214, //get that from logged in token
        lineItems: [] //get these items from database by ID but they will be passed through in production

    })

    const res = await orderItem.save()
    console.log(res)
}

makeOrder();