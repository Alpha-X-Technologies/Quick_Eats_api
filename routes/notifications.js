const express = require('express');
const { body, validationResult } = require('express-validator');
const Notification = require('../models/Notification');
const PushDevice = require('../models/PushDevice');
const router = express.Router();
const gcm = require("node-gcm");
const { sendNotification } = require('../Controllers/notifications');

router.get('/:userId', async(req, res) => {
    let id = req.params.userId;
    try {
        await Notification.find({ user: id }, (err, not) => {
            if (err) {
                console.log(err);
                res.status(500).json("Something went wrong with retrieving notifications. Check log");
            } else {
                res.json(not);
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json("Something went wrong with retrieving notifications. Check log");
    }

});

router.post('/clear', async(req, res) => {
    let userId = req.body.userId;
    try {
        Notification.delete({ user: userId }, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json("Something went wrong")
            } else {
                res.json(result);
            }
        });

    } catch (error) {
        res.status(500).json("Something went wrong");
    }
});

router.post('/broadcast', body('message').isLength({ min: 2 }), async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({ success: false, errors: errors.array() });
    }

    let message = req.body.message;

    const devices = await PushDevice.find({ platform: 0 });
    const tokensArray = devices.map((doc) => doc.token);

    let response = sendNotification(message, tokensArray, res);

    if (response) {
        res.status(201).send({ success: true });
    } else {
        res.status(500).send({ success: false, message: 'Error sending notification(s)' })
    }
});

router.post('/delete', async(req, res) => {
    let notificationsToDelete = req.body.notificationsToDelete;
    try {
        notificationsToDelete.forEach(element => {
            Notification.delete({ _id: element.id });
        });

    } catch (error) {

    }
});

// async function addNotification(body) {
//     try {
//         const notification = new Notification({
//             platform: body.platform,
//             user: body.user,
//             token: body.token,
//             body: body.body
//         });
//         await notification.save().then((not) => {
//             console.log('notification added successfully');
//         }).catch((err) => {
//             console.log(err);
//         })
//     } catch (error) {

//     }
// }

module.exports = router;
//module.exports.addNotification = addNotification;