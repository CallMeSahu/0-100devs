const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const jwt = require('jsonwebtoken');
const { Admin, Course } = require('../db');
const { JWT_SECRET } = require("../config");

// Admin Routes
router.post('/signup', async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const response = await Admin.findOne({ username, password });
    if(!response){
        Admin.create({username, password});
        res.json({ message: 'Admin created successfully' });
    }else{
        res.json({ message: 'User already exists' });
    }
});

router.post('/signin', async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const response = await Admin.findOne({ username, password });
    if(response){
        const token = jwt.sign({username}, JWT_SECRET);
        res.json({ token });
    }else{
        res.json({ message: 'User does not exist' });
    }
});

router.post('/courses', adminMiddleware, async(req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;

    const newCourse = await Course.create({ title, description, imageLink, price });
    res.json({ message: 'Course created successfully', courseId: newCourse._id });    
});

router.get('/courses', adminMiddleware, async(req, res) => {
    const courses = await Course.find({});
    res.json({ courses });
});

module.exports = router;