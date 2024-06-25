const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const jwt = require('jsonwebtoken');
const { User, Course } = require('../db');
const { JWT_SECRET } = require("../config");

// User Routes
router.post('/signup', async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const response = await User.findOne({ username, password });
    if(!response){
        User.create({ username, password });
        res.json({ message: 'User created successfully' });
    }else{
        res.json({ message: 'User already exists'});
    }
});

router.post('/signin', async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const response = await User.findOne({ username, password });
    if(response){
        const token = jwt.sign({ username }, JWT_SECRET);
        res.json({ token });
    }else{
        res.json({ message: 'User does not exist' })
    }
});

router.get('/courses', userMiddleware, async(req, res) => {
    const courses = await Course.find({});
    res.json({ courses });
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    const username = req.username;
    const courseId = req.params.courseId;

    await User.updateOne({
        username: username
    }, {
        "$push" : {
            purchasedCourses: courseId
        }
    })

    res.json({ message: "Purchase complete!" })
});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    const user = req.username;

    const purchasedCourses = await Course.find({
        "_id": {
            "$in": user.purchasedCourses
        }
    });

    res.json({ purchasedCourses })
});

module.exports = router