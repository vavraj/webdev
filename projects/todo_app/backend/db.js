const mongoose=require("mongoose")
const { string, boolean } = require("zod")

mongoose.connect("mongodb+srv://rajvaibhav:vaibhav%4001@cluster0.gaogdyh.mongodb.net/todo-application")

const todoschema=mongoose.Schema({
    title:String,
    description:String,
    completed:Boolean
})


const todo=mongoose.model('todos',todoschema);

module.exports={
    todo:todo
}