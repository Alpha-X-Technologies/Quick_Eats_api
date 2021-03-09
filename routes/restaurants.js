const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');
const verify = require('./verifyToken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Rating = require('../models/Rating');


//get all the restaurants
router.get('/', async(req, res) => {
    try {
        const restaurants = await Restaurant.find().populate('menus');
        res.json({ 'restaurants': restaurants });
    } catch (error) {
        res.json({ message: error });
    }
});

//get a specific restaurant
router.get('/restaurant/:id', verify, async(req, res) => {
    let id = req.params.id;
    try {
        const restaurant = await Restaurant.find({
            _id: id
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
    const restaurant = new Restaurant({
        name: req.body.name,
        description: req.body.description,
        contact_number: req.body.contact_number,
        campus: req.body.campus,
        //TODO get image data and upload to server and add 'picture_url' property to restaurant
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        },
        trading_hours: req.body.trading_hours,
        vendor: req.body.vendor_id
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