const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const result = require('dotenv').config({ path: path.resolve(process.cwd(), '.env') })

//for all json requests
app.use(bodyParser.json());

if (result.error) {
    throw result.error
}
//Default Route
app.get('/api/', (req, res) => {
    res.send('We are on Home');
})

//connect to db
mongoose.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true, useNewUrlParser: true }, () => {
    console.log('connected to DB');
    // const collection = client.db("test").collection("devices");
    // console.log(collection);
})

const users = require('./routes/users.js'); //require the router
app.use('/api/users', users); //use it

const restaurants = require('./routes/restaurants.js')
app.use('/api/restaurants', restaurants);


//listening to the server
app.listen(4000);