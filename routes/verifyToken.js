const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    console.log('Verifying');
    console.log(req.headers);
    //console.log(req.headers.token);
    const token = req.cookies || req.headers.token;
    console.log(token);

    if (!Object.keys(token).length) {
        if (req.cookies)
            res.redirect('/login');
        else {
            res.status(401).send('Access Denied');
        }
    }
    try {
        console.log(Object.values(token)[0])
        const verified = jwt.verify(Object.values(token)[0], process.env.TOKEN_SECRET);
        console.log(verified)
        req.userLogin = verified;
        next();
    } catch (error) {
        console.log(error.message)
        // res.status(400).send('Invalid Token');
        if (req.cookies)
            res.render('/login');
        else {
            res.status(400).send('Invalid Token');
        }
    }
};