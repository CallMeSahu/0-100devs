const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

function userMiddleware(req, res, next) {
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];
    const decoded = jwt.verify(jwtToken, JWT_SECRET);
    if(jwtToken){
        const username = decoded.username;
        req.username = username;
        next();
    }
    else{
        res.status(403).json({ message: 'Invalid token'});
    }
}

module.exports = userMiddleware;