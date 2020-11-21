const express = require('express');
const router = express.Router();
const user = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verify = require('./verifyToken');

//get all the users
router.get('/userList', async(req, res) => {
    try {
        const users = await user.find();
        res.json(users);
    } catch (error) {
        res.json({ message: error });
    }
});

//get a specific user
router.get('/user', verify, async(req, res) => {
    let mail = req.query.email;
    //console.log(mail);
    try {
        const users = await user.find({
            email: mail
        });
        res.json(users);
    } catch (error) {
        res.json({ message: error });
    }
});

//Creating a user in the db
router.post('/register', async(req, res) => {
    const emailExist = await user.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exists');
    //console.log(req.body);
    const user = new user({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: req.body.password
    });
    try {
        const saveUser = await user.save();
        res.send({ user: user._id });
    } catch (err) {
        res.json({ message: err });
    }
});

//LOGIN
router.post('/login', async(req, res) => {
    const userLogin = await user.findOne({ email: req.body.email }).catch((err) => { console.error(err); });
    if (!userLogin) return res.status(400).send('Email or password is incorrect');

    const validPass = await bcrypt.compare(req.body.password, userLogin.password).catch((err) => { console.error(err); });
    if (!validPass) return res.status(400).send('Invalid Password or email');

    //creating token
    const token = jwt.sign({ _id: userLogin._id }, process.env.TOKEN_SECRET, (err, token) => {
        console.log(token);
        res.header('auth_token', token);
        res.json('Logged In');
    });

});

module.exports = router;