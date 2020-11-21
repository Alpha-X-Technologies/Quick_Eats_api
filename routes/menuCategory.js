const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');
const MenuCategory = require('../models/MenuCategory');
const verify = require('./verifyToken');



//get all the Menus
router.get('/menuCategories', verify, async(req, res) => {
    try {
        const MenuItems = await MenuItem.find();
        res.json(MenuItems);
    } catch (error) {
        res.json({ message: error });
    }
});

//get a specific MenuItem
router.get('/menuCategory', async(req, res) => {
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
router.post('/new', upload.single('image'), async(req, res) => {
    console.log(req.body);
    const menuCategory = new MenuItem({
        name: req.body.name,
        price: req.body.price,
        tagMenu: req.body.tagMenu,
        tagMenuCategory: req.body.tagMenuCategory,
        // img:{
        //     data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
        //     contentType: 'image/png'
        // }
    });
    //console.log(req.body.CustomizationDetails);
    for (var i in req.body.CustomizationDetails) {
        // console.log(req.body.CustomizationDetails[i].name);
        const itemFromDB = await InventoryItem.find({ name: req.body.CustomizationDetails[i].name });
        menuItem.customizationDetails.push(itemFromDB[0]);
    }
    try {
        console.log(menuItem);
        const saveMenuItem = await menuCategory.save();
        res.json(saveMenuItem);
        // res.redirect('/');
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;