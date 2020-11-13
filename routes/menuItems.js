const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');
const verify = require('./verifyToken');
const image = require('../models/Image');
const multer = require('multer');
const path = require('path');
const fs = require('fs');


//get all the MenuItems
router.get('/restuaurantList', verify, async(req, res) => {
    try {
        const MenuItems = await MenuItem.find();
        res.json(MenuItems);
    } catch (error) {
        res.json({ message: error });
    }
});

//get a specific MenuItem
router.get('/menuItem', async(req, res) => {
    let mail = req.query.email;
    //console.log(mail);
    try {
        const menuItem = await MenuItem.find({
            email: mail
        });
        res.json(menuItem);
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

//Creating a MenuItem in the db
router.post('/new', upload.single('image'), async(req, res) => {
    //console.log(req.body);
    const menuItem = new MenuItem({
        name: req.body.name,
        price: req.body.price,

        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    });
    try {
        const saveMenuItem = await MenuItem.save();
        res.json(saveMenuItem);
        // res.redirect('/');
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;