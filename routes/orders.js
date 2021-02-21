const express = require('express');
const crypto = require("crypto");
const router = express.Router();
const Order = require('../models/Order');
const Rating = require('../models/Rating');
const { db } = require('../models/Order');


//get order history
//get completed and fetched orders
router.get('/history/:userId', async(req, res) => {
    let id = req.params.userId;
    try {
        await Order.find({
            user: id,
            orderStatus: 4
        }, (err, order) => {
            if (err) {
                console.log(err);
            } else {
                res.json(order);
            }
        });

    } catch (error) {
        res.status(500).json({ message: error });
    }
});


//Payfast pages
router.get('/thank-you', (req, res) => {
    res.render('Orders/thank_you.ejs');
});
router.get('/cancel', (req, res) => {
    res.render('Orders/cancel.ejs');
});


//get ongoing orders
router.get('/:userId', async(req, res) => {
    let id = req.params.userId;
    try {
        await Order.find({
            user: id,
            orderStatus: { $ne: 3 }
        }, (err, order) => {
            if (err) {
                console.log(err);
            } else {
                res.json(order);
            }
        });

    } catch (error) {
        res.status(500).json({ message: error });
    }
});

router.post('/notify', async(req, res) => {
    var payload = req.body;
    const orderId = payload.m_payment_id;
    const paymentStatus = payload.payment_status;
    //TODO need to do security checks before changing payment status
    Order.findById(orderId, (err, order) => {
        if (!order) {
            res.status(500).json(err);
        } else {
            order.progress = paymentStatus == "COMPLETE" ? 1 : 5;
            order.save().then((value) => {
                if (value)
                    res.json({ 'message': 'Order Status Changed Successfully' })
            }, (err) => {
                res.status(500).json(err);
            });
        }
    })
    console.log(payload);
    res.sendStatus(200);
});

securityChecks = (payload) => {
    //verify signature
    //check notification is received from Payfast
    //compare payment data
    //perform server request to confirm details

}


//rating order at a later stage
router.post('/rate-order', async(req, res) => {
    const rating = new Rating({
        feedback: req.body.feedback,
        rating: req.body.rating,
        restaurant: req.body.restaurantId,
        user: req.body.userId,
        menu_item: req.body.menuItemId
    });

    const ratingSave = rating.save();
    ratingSave.then((savedRating) => {
        await Order.findById(req.body.orderId, (err, order) => {
            if (!order) {
                res.status(500).json(err);
            } else {
                order.rating = savedRating._id;
                order.save().then(() => {
                    res.json({ "message": "Rating saved successfully" })
                }, (err) => {
                    res.status(500).json(err);
                });
            }
        })
    })
});

router.post('/update-status', async(req, res) => {
    var status = req.body.status;
    await Order.findById(req.body.order, (err, order) => {
        if (!order) {
            res.status(500).json(err);
        } else {
            order.progress = status;
            order.save().then((value) => {
                if (value)
                    res.json({ 'message': 'Order Status Changed Successfully' })
            }, (err) => {
                res.status(500).json(err);
            });
        }
    })
});


//Creating a new order in the DB
router.post('/new', async(req, res) => {
    console.log(req.body);
    const countQuery = Order.countDocuments({});
    var count = (await countQuery).valueOf() + 1;
    count.toString().padStart(5, '0');
    var newId = "QE" + count;
    const order = new Order({
        restaurant: req.body.restaurant,
        user: req.body.user,
        cart: req.body.cart,
        readabledOrderId: newId
    });

    try {
        const saveOrder = await order.save();
        res.json(saveOrder);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }
});


module.exports = router;