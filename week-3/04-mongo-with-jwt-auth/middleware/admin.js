const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
// Middleware for handling auth
function adminMiddleware(req, res, next) {
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];
    try {
        const response = jwt.verify(jwtToken, JWT_SECRET);
        if(response.username){
            next();
        }
    } catch (e) {
        res.json({ message: 'Invalud Token'});
    }    
}

module.exports = adminMiddleware;