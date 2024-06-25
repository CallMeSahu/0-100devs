const { Admin } = require('../db/index')
// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    const username = req.headers.username;
    const password = req.headers.password;

    const value = await Admin.findOne({ username, password });
    value ? next() : res.status(403).json({msg: 'Admin does not exist!'});
}

module.exports = adminMiddleware;