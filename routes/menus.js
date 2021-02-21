const express = require('express');
const router = express.Router();
const Menu = require('../models/Menu');
const MenuCategory = require('../models/MenuCategory');
const MenuItem = require('../models/MenuItem');
const verify = require('./verifyToken');



//get all the Menus for restaurant
router.get('/menuList/:restaurantId', verify, async(req, res) => {
    try {
        const MenuItems = await Menu.find({
            _id: req.params.restaurantId
        });
        if (MenuItems.length == 1) {
            //get menu items for menu
        }
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

//Creating a Menu item in the db
router.post('/new', async(req, res) => {
    const menuItem = new Menu({
        name: req.body.name,
        description: req.body.description,
        restaurant: req.body.restaurant
    });
    try {
        const saveMenuItem = await menuItem.save();
        res.json(saveMenuItem);
        // res.redirect('/');
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;