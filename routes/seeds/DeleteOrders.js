const Order = require("../../models/Order");
const mongoose = require('mongoose');
const path = require('path');
const result = require('dotenv').config({ path: path.resolve(process.cwd(), '.env') })

if (result.error) {
    throw result.error
}

//NOTE function to delete orders so not to have many orders in table from testing
async function deleteOrders() {
    try {
        await Order.deleteMany({ created_at: { $gte: new Date("2021-03-16T00:00-00:00"), $lte: new Date("2021-03-16T21:23-00:00") } });
        //console.log(saveRestaurant);
        //res.json(saveRestaurant);
        // res.redirect('/');
    } catch (err) {
        console.log(err);
        //res.json({ message: err });
    }
}
mongoose.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true, useNewUrlParser: true }, () => {
    console.log('connected to DB');
    // const collection = client.db("test").collection("devices");
    // console.log(collection);
})

deleteOrders();