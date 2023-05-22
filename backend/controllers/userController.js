import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const authUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body
    const user=await User.findOne({email})
    if(user&&(await bcrypt.compare(password,user.password))){
        res.json({_id:user._id,name:user.name,email:user.email,image:user.image,token:jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"30d"})})
    }else{
        res.status(401).send("Invalid email or password")
    }
})

export const registerUser=asyncHandler(async(req,res)=>{
    const {name,email,password}=req.body
    const existedUser=await User.findOne({email})
    if(existedUser){
        res.status(400).send("User already exist")
    }

    const hashPassword=await bcrypt.hash(password,10)
    const user=await User.create({name,email,password:hashPassword})
    if(user){
        res.status(201).json({_id:user._id,name:user.name,email:user.email,image:user.image,token:jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"30d"})})
    }
})