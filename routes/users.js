const express = require('express');
const router = express.Router();
const user = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verify = require('./verifyToken');
//const User = require('../models/User');

//get all the users
router.get('/userList', verify, async(req, res) => {
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

router.post('/password-update', async(req, res) => {
    const emailExist = await user.findOne({ email: req.body.email });
    if (!emailExist) return res.status(400).send('Email does not exists');

    try {
        const changeUser = await user.findOne({
            email: req.body.email
        });
        changeUser.password = req.body.password;
        const newUser = await changeUser.save();
        res.json(newUser.password);
    } catch (error) {
        res.status(400).send({ error: error });
    }
});

router.post('/update-profile/:userId', async(req, res) => {
    const currentUser = await user.findById(req.params.userId);
    if (!currentUser) return res.status(400).send('User does not exist');

    try {
        const emailExist = await user.findOne({ email: req.body.email });
        if (emailExist) return res.status(400).send('Email already exists');
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
router.post('/register', async(req, res) => {
    const emailExist = await user.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exists');
    const newUser = new user({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        contactNumber: req.body.contact_number,
        password: req.body.password,
        role: req.body.role,
        store: req.body.store
    });
    try {
        const saveUser = await newUser.save();
        res.send({ user: newUser });
    } catch (err) {
        res.status(500).send({ error: err });
        //res.json({ message: err });
    }
});

//LOGIN
router.post('/login', async(req, res) => {
    const userLogin = await user.findOne({ email: req.body.email }).catch((err) => { console.error(err); });
    if (!userLogin) return res.status(401).send('Email or password is incorrect');

    const validPass = await bcrypt.compare(req.body.password, userLogin.password).catch((err) => { console.error(err); });
    if (!validPass) return res.status(401).send('Invalid Password or email');

    //creating token
    const token = jwt.sign({ _id: userLogin._id }, process.env.TOKEN_SECRET, (err, token) => {
        var returnUser = userLogin;
        returnUser.password = undefined;
        returnUser.__v = undefined;
        res.send({ user: returnUser, accessToken: token });
        res.cookie('auth-token', token);
        res.redirect('/dashboard');
    });

});

module.exports = router;