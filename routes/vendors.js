const express = require('express');
const Restaurant = require('../models/Restaurant');
const router = express.Router();
const Vendor = require('../models/Vendor');
const verify = require('./verifyToken');

//get all the vendors
router.get('/vendorList', async(req, res) => {
    try {
        const vendors = await Vendor.find();
        res.json(vendors);
    } catch (error) {
        res.json({ message: error });
    }
});

router.get('/get-merchant-details/:restaurantId', async(req, res) => {
    let id = req.params.restaurantId;
    //console.log(id);
    // const vendor = await Vendor.aggregate([{
    //     $lookup: {
    //         from: "Restaurant",
    //         localField: "_id",
    //         foreignField: "vendor",
    //         as: "vendors"
    //     }
    // }]);
    // console.log(vendor);
    // res.json(vendor);


    await Restaurant.findById(id, (err, restaurant) => {
        if (!restaurant) {
            res.status(500).json("Rest does not exist")
        } else {
            //NOTE in the DB it is still the vendor_id even though it is changed in the model
            Vendor.findById(restaurant.vendor_id, (err, vendor) => {
                if (!vendor) {
                    res.status(500).json('Does not exist');
                } else {
                    res.json({ "merchant_id": vendor.merchant_id, "merchant_key": vendor.merchant_key })
                }
            })

        }
    });

})

//get a specific vendor
router.get('/vendor', verify, async(req, res) => {
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
router.post('edit', async(req, res) => {
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
router.put('/register', async(req, res) => {
    const emailExist = await Vendor.findOne({ trading_name: req.body.name });
    if (emailExist) return res.status(400).send('Trading name already exists');
    //const emailExist = await currentUser.findOne({ email: req.body.email }); the registered person
    console.log(req.body);
    const newVendor = new Vendor({
        trading_name: req.body.name,
        merchant_id: req.body.merchant,
        categories: req.body.categories,
        //we don't need these values for the vendor as these properties should be referenced from the user that this 
        //vendor is registered to

        //email: req.body.email,
        //contact_number: req.body.phone,
        //contact_person_name: req.body.contact_person_name,

        user: req.body.user,
    });
    try {
        const saveVendor = await newVendor.save();
        res.send({ vendor: saveVendor._id });
    } catch (err) {
        res.status(500).send({ error: err });
    }
});


module.exports = router;