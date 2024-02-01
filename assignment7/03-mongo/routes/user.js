const { Router } = require("express");
const router = Router();
const { User } = require("../db")
const { Course } = require('../db')
const userMiddleware = require("../middleware/user");

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const username = req.body.username
    const password = req.body.password

    User.create({
        username, password
    }).then(function (response) {
        res.json({
            msg: "user created successfully"
        })
    })

});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const response = await Course.find({});
    res.json({
        courses: response
    })
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;

    User.updateOne({
        username: username
    }, {
        "$push":{
             purchasedCourse: courseId ,
            }
    }).catch(function(err){
        console.log(err);
    })
    res.json({message:"purchased completed"})
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    // const username=req.headers.username
    const user=await User.findOne({
        username:req.headers.username
    })
    const courses=await Course.find({
        _id:{
            "$in": user.purchasedCourse
        }
    })
    res.json({
        courses:courses
    })
});

module.exports = router