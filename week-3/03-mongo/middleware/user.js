const { User } = require('../db');

async function userMiddleware(req, res, next) {
    const username = req.headers.username;
    const password = req.headers.password;

    const value = await User.findOne({ username, password });
    value ? next() : res.status(403).json({msg: 'User does not exist!'});
}

module.exports = userMiddleware;