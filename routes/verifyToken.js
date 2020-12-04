const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    console.log('Verifying');
    const token = req.cookies('auth-token');
    if (!token) res.redirect('/login'); //.status(401).send('Access Denied');
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.userLogin = verified;
        next();
    } catch (error) {
        res.status(400).send('Invalid Token');
    }
};