const exp = require("constants")
const express=require("express")
const jwt=require("jsonwebtoken")
const jwtPassword="123456aaa"

const app =express()

const allUsers=[
    {
        username:"rajvaibhav43210@gmail.com",
        password:"123",
        name:"vaibhav raj"
    },
    {
        username:"heyarjun@outlook.com",
        password:"542",
        name:"arjun singh"
    },
    {
        username:"itsraman@ome.to.in",
        password:"987",
        name:"raman rathore"
    }
]

function userExists(username,password){
    for(let i=0;i<allUsers.length;i++){
        if(allUsers[i].username==username && allUsers[i].password==password)
        {
            return true;
        }
    }
    return false;
}

app.use(express.json())

app.post('/signin',function(req,res){
    const username=req.body.username;
    const password=req.body.password;

    if(!userExists(username,password))
    {
       return res.status(403).json({msg:"username doesnt exist in the database"})
    }

    const token=jwt.sign({username:username},jwtPassword)
    return res.send({
        token,
    })
})

app.get('/users',function(req,res){
    const token=req.headers.authorization
    try{
        const decoded=jwt.verify(token,jwtPassword)
        const username=decoded.username
        // return all users other than this user in this we can filter out which of them is not verified
        return res.json({
            users:allUsers.filter(function(value){
                if(value.username==username){
                    return false
                }
                else{
                    return true
                }
            })
        })
        // res.json({
        //     decoded,
        //     username
        // })
    }
    catch(err){
        return res.status(403).json({msg:"invalid token"})
    }
})


app.listen(3000)