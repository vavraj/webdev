const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin } = require('../db')
const { Course } = require('../db')
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    await Admin.create({
        username,
        password
    })
    res.json({ msg: "admin created succesfully" })

});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imagelink = req.body.imagelink;

    const newCourse = await Course.create({
        title, description, imagelink, price
    });
    console.log(newCourse)

    res.json({ msg: "new course created successfully", courseId: newCourse._id })

});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
    Course.find({}).then(function(response){
        res.json({course:response})
    })
});

module.exports = router;