const express=require("express")
const {createTodo,updateTodo}=require("./types")
const {todo}=require("./db")
const cors=require("cors")//it allows any frontend to hit the backend of a server
const app=express()

app.use(express.json())
app.use(cors())

app.post('/todo',async function(req,res){
    const createPayload=req.body;
    const parsePayload=createTodo.safeParse(createPayload);
    if(!parsePayload){
        res.status(411).json({
            message:"worng input"
        })
        return ;
    }
    // put it in mongoDB
    await todo.create({
        title:createPayload.title,
        description:createPayload.description,
        completed:false
    })

    res.json({
        message:"todo created"
    })


})

app.get('/todos',async function(req,res){
    const todos=await todo.find({})
   res.json({
    todos
   })
})

app.put('/completed',async function(req,res){
    const updatePayload=req.body;
    const parsePayload=updateTodo.safeParse(updatePayload);
    if(!parsePayload){
        res.status(411).json({
            message:"worng input"
        })
        return ;
    }
    // put it in mongoDB
    await todo.updateOne({
        _id:req.body._id
    },{
        completed:true
    })

    res.json({
        message:"todo marked as completed"
    })
})

app.listen(3000)