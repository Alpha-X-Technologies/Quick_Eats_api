const express = require('express');
const crypto = require("crypto");
const router = express.Router();
const Order = require('../models/Order');
const Rating = require('../models/Rating');
const { db } = require('../models/Order');
const Cart = require('../models/Cart');
const { json } = require('express');

const WebSocket = require('ws');
const { sendNotification } = require('../Controllers/notifications');
const User = require('../models/User');


//get order history
//get completed and fetched orders
router.get('/history/:userId', async(req, res) => {
    let id = req.params.userId;
    try {
        await Order.find({
            user: id,
            orderStatus: 4
        }).populate({
            path: 'restaurant',
            populate: {
                path: 'menus',
                model: 'Menu'
            }
        }).populate({
            path: 'cart',
            populate: {
                path: 'cart_items',
                populate: [{
                    path: 'menu_item',
                    populate: {
                        path: 'extra_items',
                        populate: {
                            path: 'group',
                            model: 'MenuItemExtraGroup'
                        }
                    }
                }, {
                    path: 'menu_extra_items',
                    populate: {
                        path: 'group'
                    }
                }]
            }
        }).exec().then((pop) => {
            res.json({ orders: pop });
        }, (err) => {
            console.log(err);
            res.status(500), json('Error retrieving orders');
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
            progress: { $in: [2, 3] }
        }).populate({
            path: 'restaurant',
            populate: {
                path: 'menus',
                model: 'Menu'
            }
        }).populate({
            path: 'cart',
            populate: {
                path: 'cart_items',
                populate: [{
                    path: 'menu_item',
                    populate: {
                        path: 'extra_items',
                        populate: {
                            path: 'group',
                            model: 'MenuItemExtraGroup'
                        }
                    }
                }, {
                    path: 'menu_extra_items',
                    populate: {
                        path: 'group'
                    }
                }]
            }
        }).exec().then((pop) => {
            res.json({ orders: pop });
        }, (err) => {
            console.log(err);
            res.status(500), json('Error retrieving orders');
        });

    } catch (error) {
        console.log(error);
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
            order.progress = paymentStatus == "COMPLETE" ? 2 : 6;
            order.save().then((value) => {
                if (value)
                    res.json({ 'message': 'Order Status Changed Successfully' })
            }, (err) => {
                console.log(err);
                res.status(500).json({ message: 'Error changing order status' });
            });
        }
    })
});

securityChecks = (payload) => {
    //verify signature
    //check notification is received from Payfast
    //compare payment data
    //perform server request to confirm details

}

const broadcast = (clients, userId, message) => {
    if (clients != null) {
        // clients.forEach((client) => {
        //     if (client.readyState === WebSocket.OPEN) {
        //         //console.log(message);
        //         client.send(message);
        //     }
        // });
        let client = clients.find(c => c.id == userId);
        if (client.connection.readyState == WebSocket.OPEN) {
            console.log('sent ' + message);
            client.connection.send(message);
        } else {
            console.log(client.connection.readyState);
            console.log('state not in ready')
        }
    } else {
        console.log('clients do not exist. Something wrong with connection');
    }
};

const pushMessageSse = (clients, userId, message) => {
    if (clients != null) {
        // clients.forEach((client) => {
        //     if (client.readyState === WebSocket.OPEN) {
        //         //console.log(message);
        //         client.send(message);
        //     }
        // });
        let client = clients.find(c => c.id == userId);
        console.log(message);
        client.response.write(message.toString());
    } else {
        console.log('clients do not exist. Something wrong with connection');
    }
    //clients.forEach(client => client.response.write(message))
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

    const ratingSave = await rating.save();
    ratingSave.then((savedRating) => {
        Order.findById(req.body.orderId, (err, order) => {
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

//NOTE what I use to test the changing of the order status
router.post('/update-status', async(req, res) => {
    var status = req.body.status;
    await Order.findById(req.body.order, (err, order) => {
        if (!order) {
            res.status(500).json(err);
        } else {
            order.progress = status;
            order.save().then((value) => {
                if (value) {
                    value.populate('user', (err, doc) => {
                        console.log(doc.user._id);
                        broadcast(req.app.locals.clients, doc.user._id, status);
                        //pushMessageSse(req.app.locals.clients, doc.user._id, status);
                    });
                    //broadcast message to client app
                    res.json({ 'message': 'Order Status Changed Successfully' });
                }

            }, (err) => {
                res.status(500).json(err);
            });
        }
    })
});



//Creating a new order in the DB
router.post('/new', async(req, res) => {
    //TODO need to randomise order id for security purposes
    const countQuery = Order.countDocuments({});
    var count = (await countQuery).valueOf() + 1;
    var countString = count.toString().padStart(5, '0');
    var newId = "QE" + countString;

    const cart = new Cart({
        total: req.body.cart.total,
        number_items: req.body.cart.number_items,
        cart_items: req.body.cart.cart_items,
        total_discount: req.body.cart.total_discount,
        is_active: true,
        user: req.body.user,
    });

    //TODO notify vendor of created order
    try {
        await cart.save().then((value) => {
            const order = new Order({
                restaurant: req.body.restaurant,
                user: req.body.user,
                cart: value._id,
                readableOrderId: newId
            });
            order.save().then((value) => {
                res.json({ order: value });
            }).catch((err) => {
                console.log(err);
                res.status(500), json('Error creating order');
            });
        }, (err) => {
            console.log(err);
            res.status(500).json({ message: err });
        })
    } catch (error) {
        res.status(400), json('Error creating order');
    }

});
router.put('/cancel/:orderId', async(req, res) => {
    const progress = 6;
    await Order.findById(req.params.orderId, (err, order) => {
        if (!order) {
            res.status(500).json(err);
        } else {
            order.progress = progress;
            order.save().then((value) => {
                if (value) {
                    //broadcast message to client app 
                    var id = order.userId;
                    value.populate('user', (err, doc) => {
                        //TODO notify vendor site of cancelled order
                        //broadcast(req.app.locals.clients, doc.user._id, 2);
                        //sendNotification('Order Cancelled By User', [doc.user.token]);
                    });
                    res.json({ 'message': 'Order Status Changed Successfully' });
                }

            }, (err) => {
                res.status(500).json(err);
            });
        }
    })
});

router.put('/complete/:orderId', async(req, res) => {
    const progress = 3;
    await Order.findById(req.params.orderId, (err, order) => {
        if (!order) {
            res.status(500).json(err);
        } else {
            order.progress = progress;
            order.save().then((value) => {
                if (value) {
                    //broadcast message to client app 
                    value.populate('restaurant').populate('user', (err, doc) => {
                        //TODO notify client of complete order
                        if (!err) {
                            broadcast(req.app.locals.clients, doc.user._id, progress);
                            //pushMessageSse(req.app.locals.clients, doc.user._id, progress);
                            console.log(doc.restaurant.name);
                            sendNotification('Order done and ready for collection at '.concat(doc.restaurant.name), [doc.user.token]);
                        } else {
                            console.log(err);
                        }
                    });
                    res.json({ 'message': 'Order Status Changed Successfully' });
                }

            }, (err) => {
                res.status(500).json(err);
            });
        }
    })
});

router.put('/reject/:orderId', async(req, res) => {
    const progress = 6;
    await Order.findById(req.params.orderId, (err, order) => {
        if (!order) {
            res.status(500).json(err);
        } else {
            order.progress = progress;
            order.save().then((value) => {
                if (value) {
                    //broadcast message to client app 
                    var id = order.userId;
                    value.populate('user', (err, doc) => {
                        //TODO notify client of rejected order
                        broadcast(req.app.locals.clients, doc.user._id, progress);
                        sendNotification('Order Rejected By Restaurant', [doc.user.token]);
                    });
                    res.json({ 'message': 'Order Status Changed Successfully' });
                }

            }, (err) => {
                res.status(500).json(err);
            });
        }
    })
});

router.put('/fetched/:orderId', async(req, res) => {
    const progress = 4;
    await Order.findById(req.params.orderId, (err, order) => {
        if (!order) {
            res.status(500).json(err);
        } else {
            order.progress = progress;
            order.save().then((value) => {
                if (value) {
                    //broadcast message to client app 
                    var id = order.userId;
                    value.populate('user', (err, doc) => {
                        //TODO notify vendor of fetched order and add to queue if implemented
                        //broadcast(req.app.locals.clients, doc.user._id, 2);
                        //sendNotification('Order Cancelled By User', [doc.user.token]);
                    });
                    console.log('fetched');
                    res.json({ 'message': 'Order Status Changed Successfully' });
                }

            }, (err) => {
                res.status(500).json(err);
            });
        }
    })
});

router.put('/accept/:orderId', async(req, res) => {
    const progress = 1;
    await Order.findById(req.params.orderId, (err, order) => {
        if (!order) {
            res.status(500).json(err);
        } else {
            order.progress = progress;
            order.save().then((value) => {
                if (value) {
                    //broadcast message to client app 
                    value.populate('user', (err, doc) => {
                        //TODO notify client of complete order
                        if (!err) {
                            broadcast(req.app.locals.clients, doc.user._id, progress);
                            //pushMessageSse(req.app.locals.clients, doc.user._id, progress);
                            let sendResponse = sendNotification('Order accepted by '.concat(doc.restaurant.name), [doc.user.token]);
                            //console.log(sendResponse);
                        } else {
                            console.log(err);
                        }
                    });
                    res.json({ 'message': 'Order Status Changed Successfully' });
                }

            }, (err) => {
                res.status(500).json(err);
            });
        }
    })
});
//delete an order
// router.get('/order/:id', verify, async(req, res) => {

// });
//post an order

module.exports = router;