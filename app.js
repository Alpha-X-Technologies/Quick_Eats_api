const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
var cookieParser = require('cookie-parser')
const verify = require('../Quick_Eats_api/routes/verifyToken');
const result = require('dotenv').config({ path: path.resolve(process.cwd(), '.env') })


//for all json requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (result.error) {
    throw result.error
}


//connect to db
mongoose.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true, useNewUrlParser: true }, () => {
    console.log('connected to DB');

})


const users = require('./routes/users.js'); //require the router
app.use('/users', users); //use it

const vendors = require('./routes/vendors.js');
app.use('/vendor', vendors);

const menuItems = require('./routes/menuItems.js')
app.use('/menuItems', menuItems);

const menus = require('./routes/menus.js')
app.use('/menus', menus);

const orders = require('./routes/orders.js');
app.use('/orders', orders);

const restaurants = require('./routes/restaurants.js')
app.use('/restaurants', restaurants);

const menuItemCategories = require('./routes/menuCategory.js')
app.use('/menuItemCategories', menuItemCategories);

// const dashboards = require('./routes/dashboards.js')
// app.use('/management/dash')

//listening to the server
app.listen(4000);