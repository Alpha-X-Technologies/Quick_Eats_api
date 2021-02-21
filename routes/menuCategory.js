const express = require('express');
const { verify } = require('jsonwebtoken');
const Category = require('../models/MenuCategory');
const router = express.Router();
const multer = require('multer');

router.get('/', verify, async(req, res) => {
    try {
        const menuCategories = await Category.find();
        res.json(menuCategories);
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

router.post('add', async(req, res) => {
    const nameExist = await Category.findOne({ name: req.body.name });
    if (nameExist) return res.status(400).send('Name already exists');

    const menuCategory = new Category({
        name: req.body.name,
        picture_url: __dirname + '/uploads/' + req.file.filename
    });

    try {
        const saveCat = await menuCategory.save();
        res.json(saveCat);
    } catch (error) {
        res.json({ message: error });
    }
});


router.get(':id', verify, async(req, res) => {
    try {
        var id = req.params.id;
        const menuCategories = await Category.find({
            _id: id
        });
        res.json(menuCategories);
    } catch (error) {
        res.json({ message: error });
    }
});

module.exports = router;