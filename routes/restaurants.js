const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');
const verify = require('./verifyToken');
const image = require('../models/Image');
const multer = require('multer');
const path = require('path');
const fs = require('fs');


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

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './routes/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

const upload = multer({ storage: storage });

//Creating a Restaurant in the db
router.post('/new', upload.single('image'), async(req, res) => {
    //console.log(req.body);
    const restaurant = new Restaurant({
        name: req.body.name,
        email: req.body.email,
        tel: req.body.tel,
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
        // res.redirect('/');
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;