import jwt from "jsonwebtoken";
import asyncHandeler from "express-async-handler"
import User from "../models/userModel.js";
import Memo from "../models/memoModel.js";
import Todo from "../models/todoModel.js";

export const protect=asyncHandeler(async(req,res,next)=>{
    let token
    if(req.headers.authorization&&req.headers.authorization.startsWith("Bearer")){
        try{
            token=req.headers.authorization.split(" ")[1]
            const decoded=jwt.verify(token,process.env.JWT_SECRET)
            // console.log(decoded)

            req.user=await User.findById(decoded.userId).select("-password")
            // console.log(req.user)
            next()
        }catch(e){
            // console.log(e)
            res.status(401).send("Not authorized,token failed")

            if(!token){
                res.status(401).send("Not autorized,no token")
            }
        }
    }
})

export const findMemoById = asyncHandeler(async(req,res,next)=>{
    req.memo=await Memo.findById(req.params.id)
    if(req.memo){
        next()
    }else{
        res.status(404).send("Memo is not found")
    }
})

export const findTodoById=asyncHandeler(async(req,res,next)=>{
    req.todo=await Todo.findById(req.params.id)
    if(req.todo){
        next()
    }else{
        res.status(404).send("Todo is not found")
    }
})

//check ownerId of memo or todo and params id are same or not
export const checkMemoOwner=asyncHandeler(async(req,res,next)=>{
    req.memo=await Memo.findById(req.params.id)
    if(req.memo&&toString(req.memo.owner)==toString(req.user._id)){
        next()
    }else{
        res.status(401).json("You are not owner of this memo")
    }
})

export const checkTodoOwner=asyncHandeler(async(req,res,next)=>{
    req.todo=await Todo.findById(req.params.id)
    if(req.todo&&toString(req.todo.owner)==toString(req.user._id)){
        next()
    }else{
        res.status(401).json("You are not owner of this todo")
    }
})

// const checkMemoId=req.params.id 
    //memo or todo which u want give the permission
// const givenUser=req.body 
    //user who get the permission