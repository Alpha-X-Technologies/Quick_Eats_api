const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    console.log('Verifying');
    const token = req.cookies;
    console.log(token);

    if (!Object.keys(token).length) res.redirect('/login'); //.status(401).send('Access Denied');
    try {
        console.log(Object.values(token)[0])
        const verified = jwt.verify(Object.values(token)[0], process.env.TOKEN_SECRET);
        console.log(verified)
        req.userLogin = verified;
        next();
    } catch (error) {
        console.log(error.message)
            // res.status(400).send('Invalid Token');
        res.render('login')
    }
};