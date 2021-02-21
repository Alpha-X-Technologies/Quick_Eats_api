const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
const verify = require('../Quick_Eats_api/routes/verifyToken');
const result = require('dotenv').config({ path: path.resolve(process.cwd(), '.env') })

//we are going to be using EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

//for all json requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

if (result.error) {
    throw result.error
}
//Default Route
app.use(cookieParser());
app.get('/', (req, res) => {
    const cookieExists = req.cookies
    console.log('cook', cookieExists)
    if (isEmptyObject(cookieExists)) {
        res.render('login.ejs');
    } else {
        res.render('dashboard.ejs', { title: 'Home' });
    }
});
app.get('/', (req, res) => {
    res.render('register.ejs')
})

app.get('/orders', verify, (req, res) => {
    res.render('orders.ejs')
})
app.get('/dashboard', verify, (req, res) => {
    res.render('dashboard.ejs')
})

function isEmptyObject(obj) {
    return !Object.keys(obj).length;
}

app.get('/login', (req, res) => {
    res.render('login.ejs', { title: 'Home' });
});


//connect to db
mongoose.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true, useNewUrlParser: true }, () => {
    console.log('connected to DB');
    // const collection = client.db("test").collection("devices");
    // console.log(collection);
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