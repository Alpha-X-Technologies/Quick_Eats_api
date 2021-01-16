const express = require('express');
const router = express.Router();
const Vendor = require('../models/Vendor');
const verify = require('./verifyToken');

//get all the vendors
router.get('/vendorList', async (req, res) => {
    try {
        const vendors = await Vendor.find();
        res.json(vendors);
    } catch (error) {
        res.json({ message: error });
    }
});

//get a specific vendor
router.get('/vendor', verify, async (req, res) => {
    let mail = req.query.email;
    //console.log(mail);
    try {
        const vendors = await Vendor.find({
            email: mail
        });
        res.json(vendors);
    } catch (error) {
        res.json({ message: error });
    }
});

//editing a vendor
router.post('edit', async (req, res) => {
    const currentVendor = await Vendor.findOne({ id: req.body.id });
    if (!currentVendor) return res.status(400).send('Vendor does not exist');

    try {
        const nameExist = await Vendor.findOne({ trading_name: req.body.name });
        if (!nameExist) return res.status(400).send('Trading name already exists');
        if (req.body.name)
            currentUser.name = req.body.name;
        if (req.body.surname)
            currentUser.surname = req.body.surname;
        if (req.body.email)
            currentUser.email = req.body.email;
        if (req.body.contactNumber)
            currentUser.contactNumber = req.body.contact_number;
        const newUser = await currentUser.save();
        res.json(newUser);
    } catch (error) {
        res.status(400).send({ error: error });
    }
});

//Creating a user in the db
router.put('/register', async (req, res) => {
    const emailExist = await Vendor.findOne({ trading_name: req.body.name });
    if (emailExist) return res.status(400).send('Trading name already exists');
    //const emailExist = await currentUser.findOne({ email: req.body.email }); the registered person
    //console.log(req.body);
    const newVendor = new Vendor({
        trading_name: req.body.name,
        merchant_id: req.body.merchant,
        category: req.body.category,
        //we don't need these values for the vendor as these properties should be referenced from the user that this 
        //vendor is registered to

        //email: req.body.email,
        //contact_number: req.body.phone,
        //contact_person_name: req.body.contact_person_name,

        user_id: req.body.user_id,
        updated_at: Date.now(),
        created_at: Date.now()
    });
    try {
        //console.log(newVendor);
        const saveVendor = await newVendor.save();
        res.send({ vendor: vendor._id });
    } catch (err) {
        res.status(500).send({ error: err });
    }
});


module.exports = router;