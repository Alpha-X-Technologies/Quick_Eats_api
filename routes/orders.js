const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const verify = require('./verifyToken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

//get all the orders
router.get('/orderList', verify, async(req, res) => {
    try {
        const orders = await order.find();
        res.json(orders);
    } catch (error) {
        res.json({ message: error });
    }
});

//get a specific order
router.get('/order', verify, async(req, res) => {
    let userId = req.query.userId;
    //console.log(mail);
    try {
        const orders = await order.find({
            user: userId
        });
        res.json(users);
    } catch (error) {
        res.json({ message: error });
    }
});
module.exports = router;