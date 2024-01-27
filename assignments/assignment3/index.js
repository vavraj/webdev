const mongoose = require("mongoose")
const express = require("express")

const app = express()
mongoose.connect("mongodb+srv://rajvaibhav:vaibhav%4001@cluster0.gaogdyh.mongodb.net/userappnew")

const User = mongoose.model('Users', { name: String, email: String, password: String })

app.use(express.json())

app.post('/SignUp', async function (req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const pass = req.body.password;

    const exsistingUser = await User.findOne({ email: email })
    if (!exsistingUser) {
        const user = new User({
            name: name,
            email: email,
            password: pass
        })
        user.save()
        return res.json({msg:"SignedUp successfully"})
    }
    else{
        return res.status(403).json({msg:"user already exists"})
    }
    
})

app.listen(3000)