const express = require('express');
const router = express.Router();
const Menu = require('../models/Menu');
const MenuCategory = require('../models/MenuCategory');
const verify = require('./verifyToken');



//get all the Menus
router.get('/menuList', verify, async(req, res) => {
    try {
        const MenuItems = await MenuItem.find();
        res.json(MenuItems);
    } catch (error) {
        res.json({ message: error });
    }
});

//get a specific MenuItem
router.get('/menu', async(req, res) => {
    let name = req.query.name;
    console.log(name);
    try {
        const menuItem = await MenuItem.find({
            name: name
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
router.post('/new', async(req, res) => {
    console.log(req.body);
    const menuItem = new MenuItem({
        name: req.body.name,
        tag: req.body.store
    });
    //console.log(req.body.CustomizationDetails);
    for (var i in req.body.CustomizationDetails) {
        // console.log(req.body.CustomizationDetails[i].name);
        const itemFromDB = await InventoryItem.find({ name: req.body.CustomizationDetails[i].name });
        menuItem.customizationDetails.push(itemFromDB[0]);
    }
    try {
        console.log(menuItem);
        const saveMenuItem = await menuItem.save();
        res.json(saveMenuItem);
        // res.redirect('/');
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;