const { Admin } = require("../db");

async function adminMiddleware(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    const value = await Admin.findOne({username, password});
    if(value){
        next();
    }else{
        res.status(403).json({ msg: 'User does not exist'})
    }    
}

module.exports = adminMiddleware;