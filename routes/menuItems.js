const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');
const InventoryItem = require('../models/Inventory');
const MenuCategory = require('../models/MenuCategory')
const verify = require('./verifyToken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

router.get('/', (req, res) => {
    MenuCategory.find({}, (err, category) => {
        if (err) {
            console.log(err);
        } else {
            InventoryItem.find({}, (err, inventory) => {
                if (err) {
                    console.log(err);
                } else {
                    res.render('item', {
                        inventory: inventory,
                        category: category
                    });
                }
            });
            // res.render('item', { category: category });
        }
    });
});
// Retriving the image 
router.get('/manageItems', (req, res) => {
    MenuItem.find({}, (err, items) => {
        if (err) {
            console.log(err);
        } else {
            res.render('item', { items: items });
        }
    });
});

router.get('/page', (req, res) => {
    res.render('item')
})

//get all the MenuItems
router.get('/menuItemList', verify, async(req, res) => {
    try {
        const MenuItems = await MenuItem.find();
        res.json(MenuItems);
    } catch (error) {
        res.json({ message: error });
    }
});

//get a specific MenuItem
router.get('/menuItem', async(req, res) => {
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
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

const upload = multer({ storage: storage });

//Creating a MenuItem in the db
router.post('/new', upload.single('image'), async(req, res, next) => {
    console.log(req.body);
    const menuItem = new MenuItem({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        // tagMenu: req.body.tagMenu, this should be computed according to Who uploaded it
        img: {
            data: fs.readFileSync(process.cwd() + '/uploads/' + req.file.filename),
            contentType: 'image/png'
        }
    });
    //console.log(req.body.CustomizationDetails);
    for (var i in req.body.customizationDetails) {
        menuItem.customizationDetails.push(req.body.customizationDetails[i]);
    }
    try {
        const saveMenuItem = await menuItem.save().then(function() {
            const menuForItem = MenuCategory.findById(menuItem.category).then(doc => {
                doc.menuItems.push(doc._id);
                const savedItemToCategory = doc.save();
                res.send(doc);
            }).catch(err => {
                console.log(err);
                return res.status(500).send("something went wrong");
            });
            // console.log(menuForItem);
        });


        //res.redirect('/api/menuItems');
    } catch (err) {
        console.log(err);
        res.json({ message: err });
    }



});


module.exports = router;