const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require('../db');

// User Routes
router.post('/signup', async(req, res) => {
    const username = req.headers.username;
    const password = req.headers.password;

    const response = await User.find({username, password});
    console.log(response)
    if(response.lenght > 0){
        res.status(403).json({message: 'User already exists'});
    }else{
        User.create({ username, password });
        res.json({ message: 'User created successfully' });
    }
});

router.get('/courses', async (req, res) => {
    const allCourses = await Course.find({});
    res.json({ courses: allCourses });
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    const courseId = req.params.courseId;
    const username = req.headers.username;

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
    const user = await User.findOne({username: req.headers.username});
    console.log(user);
    const courses = await Course.find({
        "_id": {
            "$in": user.purchasedCourses
        }
    });

    res.json({
        courses: courses
    })
});

module.exports = router