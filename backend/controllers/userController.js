import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const authUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body
    const user=await User.findOne({email})
    if(user&&(await bcrypt.compare(password,user.password))){
        // console.log(jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"30d"}))
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

export const getUserProfile=asyncHandler(async(req,res)=>{
    res.json(req.user)
})

export const searchUser=asyncHandler(async(req,res)=>{
    if(req.query.userKeyword==""){
        res.json([])
    }else{
        const query= {$or:[{name:{$regex:req.query.userKeyword}},{email:{$regex:req.query.userKeyword}}]}
        const user=await User.find(query).select("_id name email image")
        if(user){
            res.json(user)
        }else{
            res.status(404).send("User not found")
        }
    }
})


//need to tell b user of yourself-ptotect- memo.owner == req.parmas.id,memo,user who you eant add
// if readlist does exist needs to filter(!id)
// if(memolist.includes()) if there is no and memo.memolist.push(_id)
// 

// user, memo, friend
// protect --> have
// findMemo --> to find the memo if it exists
// checkOwnerMiddleware -> will check if the memo belongs to the owner
// removePermissionMiddleware -> it will remove read and write permission your friend, also 
