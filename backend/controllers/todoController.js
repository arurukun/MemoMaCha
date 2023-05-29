import asyncHandler from "express-async-handler"
import Todo from "../models/todoMode.js"

export const createTodo=asyncHandler(async(req,res)=>{
    const {category,todoItems}=req.body
    if(category&&category.length<=0){
        res.json("ToDoList is empty")
    }else{
        const todolist=new Todo({category,owner:req.user._id})
        // todolist.push(todoItems)
        for(let item in todoItems){
            todolist.todoItems.push(todoItems[item])
        }
        // for(let i = 0; i < todoItems.length; i++){
        //     todolist.todoItems.push(todoItems[i])
        // }
        todolist.writeUser.push(req.user._id)
        const createdTodolist=await todolist.save()
        // const user = req.user
        req.user.todoList.push(createdTodolist._id)
        await req.user.save()
        res.status(202).json(createdTodolist)
    }
})