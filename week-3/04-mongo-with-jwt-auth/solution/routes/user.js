const { Router } = require("express");
const userRouter = Router();
const userMiddleware = require("../middleware/user");
const {User,Course} = require("../db/index")
const jwt = require("jsonwebtoken")
// User Routes
const express = require("express");
const app = express();

userRouter.post('/signup',async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = await User.create({username,password})
    res.send({message: 'User created successfully'});
});


userRouter.post('/signin', async (req, res) => {
    const {username,password} = req.body;
    const user = await User.findOne({username})
    if(user && user.password===password)
    {
         const token = jwt.sign({username},"secret")
         res.send({ token: token })
    }
    else
        res.status(401).send("")

});
userRouter.get('/courses', async(req, res) => {
    const courses = await Course.find({})
    res.send({courses:courses})
 });

userRouter.post('/courses/:courseId', userMiddleware,async (req, res) => {
   const id = req.params.courseId;
   const course = await Course.findOne({_id:id})
   const user = await User.findOne({username:req.user});

   user.courses.push(course);
   await user.save();
   res.send({ message: 'Course purchased successfully' })
});

userRouter.get('/purchasedCourses', userMiddleware, async (req, res) =>
 {
    const user = await User.findOne({username:req.user});
    res.send({"purchasedCourses":user.courses})
});

module.exports = userRouter