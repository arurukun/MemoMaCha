import jwt from "jsonwebtoken";
import asyncHandeler from "express-async-handler"
import User from "../models/userModel.js";

export const protect=asyncHandeler(async(req,res,next)=>{
    let token
    if(req.headers.authorization&&req.headers.authorization.startsWith("Bearer")){
        try{
            token=req.headers.authorization.split(" ")[1]
            const decoded=jwt.verify(token,process.env.JWT_SECRET)
            console.log(decoded)

            req.user=await User.findById(decoded.userId).select("-password")
            // console.log(req.user)
            next()
        }catch(e){
            console.log(e)
            res.status(401).send("Not authorized,token failed")

            if(!token){
                res.status(401).send("Not autorized,no token")
            }
        }
    }
})