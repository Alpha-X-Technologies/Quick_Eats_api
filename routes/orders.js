const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const verify = require('./verifyToken');
const multer = require('multer');
const fs = require('fs');

//get all the orders
router.get('/orderList', verify, async(req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        res.json({ message: error });
    }
});

//get all orders for a user
router.get('/order', verify, async(req, res) => {
    let userId = req.query.userId;

    try {
        const orders = await Order.find({
            user: userId
        });
        res.json(orders);
    } catch (error) {
        res.json({ message: error });
    }
});

//get a specific order
router.get('/order/:id', verify, async(req, res) => {

});

//patch(update) an order
router.get('/order/:id', verify, async(req, res) => {

});
//delete an order
router.get('/order/:id', verify, async(req, res) => {

});
//post an order

module.exports = router;