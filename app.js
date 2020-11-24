const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
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
app.get('/', (req, res) => {
    res.render('home');
});

//connect to db
mongoose.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true, useNewUrlParser: true }, () => {
    console.log('connected to DB');
    // const collection = client.db("test").collection("devices");
    // console.log(collection);
})


const users = require('./routes/users.js'); //require the router
app.use('/api/users', users); //use it

const vendors = require('./routes/vendors.js');
app.use('/api/vendor', vendors);

const menuItems = require('./routes/menuItems.js')
app.use('/api/menuItems', menuItems);

// const menus = require('./routes/menus.js')
// app.use('/api/menus', menus);

const restaurants = require('./routes/restaurants.js')
app.use('/api/restaurants', restaurants);

//listening to the server
app.listen(4000);