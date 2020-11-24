const express = require('express');
const router = express.Router();
const vendor = require('../models/Vendors');
const verify = require('./verifyToken');

//get all the vendors
router.get('/vendorList', async(req, res) => {
    try {
        const vendors = await vendor.find();
        res.json(vendors);
    } catch (error) {
        res.json({ message: error });
    }
});

//get a specific vendor
router.get('/vendor', verify, async(req, res) => {
    let mail = req.query.email;
    //console.log(mail);
    try {
        const vendors = await vendor.find({
            email: mail
        });
        res.json(vendors);
    } catch (error) {
        res.json({ message: error });
    }
});

//Creating a user in the db
router.post('/register', async(req, res) => {
    const emailExist = await vendor.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exists');
    //const emailExist = await currentUser.findOne({ email: req.body.email }); the registered person
    //console.log(req.body);
    const newVendor = new vendor({
        trading_name: req.body.name,
        merchant_id: req.body.merchant,
        email: req.body.email,
        contact_number: req.body.phone,
        updated_at: Date.now(),
        created_at: Date.now()
    });
    try {
        const saveVendor = await newVendor.save();
        res.send({ vendor: vendor._id });
    } catch (err) {
        res.json({ message: err });
    }
});


module.exports = router;