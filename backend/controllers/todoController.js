import asyncHandler from "express-async-handler"
import Todo from "../models/todoModel.js"
import User from "../models/userModel.js"

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

export const getListTodo=asyncHandler(async(req,res)=>{
    const userPopulate=await req.user.populate("todoList","_id category todoItems updateAt")
    const todoList=userPopulate.todoList
    if(todoList){
        res.json(todoList)
    }else{
        res.status(404).send("Todo is empty")
    }
})

export const getTodo=asyncHandler(async(req,res)=>{
    const user=req.user
    const todoId=req.params.id
    if(user.todoList.includes(todoId) || user.todoList.includes(todoId)){
        const todo=await Todo.findById(todoId)
        res.send(todo)
    }else{
        res.status(401).send("Not authorized")
    }
})

export const editTodo=asyncHandler(async(req,res)=>{
    const {category,todoItems}=req.body
    const todo=await Todo.findById(req.params.id)
    const user=req.user
    if(todo){
        if(user&&user.todoList.includes(todo._id)){
            todo.category=category||todo.category
            todo.todoItems=todoItems||todo.todoItems
            const updatedTodo=await todo.save()
            res.send(updatedTodo)
        }else{
            res.status(401).send("Not authorized")
        }
    }else{
        res.status(404).send("Todo is not found")
    }
})

export const deleteTodo=asyncHandler(async(req,res)=>{
    if(toString(req.todo.owner)===toString(req.user._id)){
        for(let i=0; i<req.todo.writeUser.length; i++){
            const user=await User.findById(req.todo.writeUser[i])
            user.todoList=user.todoList.filter((e)=>e !==req.todo.writeUser[i])
            await user.save()
        }
        for(let i=0; i<req.todo.readUser.length; i++){
            const user=await User.findById(req.todo.readUser[i])
            user.todoList=user.todoList.filter((e)=>e !==req.todo.readUser[i])
            await user.save()
        }
        await Todo.findByIdAndRemove(req.todo._id)
        res.json({massage:"Todo was deleted"})
    }else{
        res.status(404).send("Not authorized.Only owner can delete it")
    }
})

export const addWriteUser=asyncHandler(async(req,res)=>{
    const {selectedUser}=req.body
    const todo=req.todo
    const selectedUserValid=await User.findById(selectedUser)
    if(todo&&selectedUserValid){
        todo.readUser=todo.readUser.filter((id)=>{id!==selectedUserValid._id})
        todo.writeUser=todo.writeUser.filter((id)=>{id!==selectedUserValid._id})
        todo.writeUser.push(selectedUserValid._id)
        await todo.save()
        if(!selectedUserValid.todoList.includes(todo._id)){
            selectedUserValid.todoList.push(todo._id)
            await selectedUserValid.save()
            res.send("Success")
        }else{
            res.json("Alread give the same permission")
        }
    }else{
        res.status(404).json("Todo or selected user is not found")
    }
})

export const addReadUser=asyncHandler(async(req,res)=>{
    const {selectedUser}=req.body
    const todo=req.todo
    const selectedUserValid=await User.findById(selectedUser)
    // console.log(selectedUserValid)
    if(todo&&selectedUserValid){
        todo.writeUser=todo.writeUser.filter((id)=>{id!==selectedUserValid._id})
        todo.readUser=todo.readUser.filter((id)=>{id!==selectedUserValid._id})
        todo.readUser.push(selectedUserValid._id)
        await todo.save()
        if(!selectedUserValid.todoList.includes(todo._id)){
            selectedUserValid.todoList.push(todo._id)
            await selectedUserValid.save()
            res.send("Success")
        }else{
            res.json("Alread give the same permission")
        }
    }else{
        res.status(404).json("Memo or selected user is not found")
    }
})