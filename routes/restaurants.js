const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');
const querystring = require('querystring');
const verify = require('./verifyToken');


//get all the restaurants
router.get('/restuaurantList', verify, async(req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.json(restaurants);
    } catch (error) {
        res.json({ message: error });
    }
});

//get a specific restaurant
router.get('/restaurant', async(req, res) => {
    let mail = req.query.email;
    //console.log(mail);
    try {
        const restaurant = await Restaurant.find({
            email: mail
        });
        res.json(restaurant);
    } catch (error) {
        res.json({ message: error });
    }
});

//Creating a Restaurant in the db
router.post('/', verify, async(req, res) => {
    //console.log(req.body);
    const restaurant = new Restaurant({
        name: req.body.name,
        priceRange: req.body.surname,
        email: req.body.email,
        tel: req.body.tel,
        url: req.body.url,
        location: req.body.location,
        openTimes: req.body.openTimes,
        categories: req.body.categories,
        hasMenu: true,
        aggregateRating: req.body.aggregateRating,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    });
    try {
        const saveRestaurant = await restaurant.save();
        res.json(saveRestaurant);
        //res.redirect('/'); 
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;