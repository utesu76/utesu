const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    if (req.headers.authorization) {
        if (req.headers.authorization.split(' ')[0] == 'Bearer') {
            jwt.verify(req.headers.authorization.split(' ')[1], process.env.HASH, function (err, decoded) {
                if (err) {
                    res.status(403).json('Invalid JWT Token')
                } else {
                    req.jwt = decoded
                    next();
                }
            })
        } else {
            res.status(401).json('Incorrect Auth Headers')
        }
    } else {
        res.status(400).json('Missing Auth Headers')
    }
};