import asyncHandler from "express-async-handler"
import Memo from "../models/memoModel.js"
import Todo from "../models/todoModel.js"
import { Types } from "mongoose";
import User from "../models/userModel.js";

export const createMemo=asyncHandler(async(req,res)=>{
    const {tytle,content}=req.body
    if(tytle&&tytle.length<=0){
        res.send("MemoBox is empty")
    }else{
        const memobox=new Memo({tytle,content,owner:req.user._id})
        memobox.writeUser.push(req.user._id)
        const createdMemo=await memobox.save()
        req.user.memoList.push(createdMemo._id)
        await req.user.save()
        res.status(202).send(createdMemo)
    }
})

export const getListMemo=asyncHandler(async(req,res)=>{
    // const keyword=req.query.keyword ? {name:{$regex:req.query.keyword,$option:"i"}} : {}
    const userPopulate=await req.user.populate('memoList', "_id tytle content updatedAt")
    const memoList = userPopulate.memoList
    if(memoList){
        res.json(memoList)
    }else{
        res.status(404).send("Mmeo is empty")
    }
})

export const getMemo=asyncHandler(async(req,res)=>{
    const user=req.user
    const memoId = req.params.id
    if(user.memoList.includes(memoId) || user.memoList.includes(memoId)){
        const memo=await Memo.findById(memoId)
        res.json(memo)
    }else{
        res.status(401).send("Not authorized")
    }

    // const memo=await Memo.findById(req.params.id)
    // const user=req.user
    // if(memo){
    //     if(user.writeUser||user.readUser){
    //         res.json(memo)
    //     }else{
    //         res.status(401).send("Not authorized")
    //     }
    // }else{
    //     res.status(404).send("Memo is not found")
    // }
})

export const editMemo=asyncHandler(async(req,res)=>{
    const {tytle,content}=req.body
    const memo=await Memo.findById(req.params.id)
    const user=req.user
    if(memo){
        if(user&&user.memoList.includes(memo._id)){
            memo.tytle=tytle||memo.tytle
            memo.content=content||memo.content

            const updatedMemo=await memo.save()
            res.send(updatedMemo)
        }else{
            res.status(401).send("Not authorized")
        }
    }else{
        res.status(404).send("Memo is not found")
    }
})

export const deleteMemo=asyncHandler(async(req,res)=>{
    if(toString(req.user._id) === toString(req.memo.owner)){
        for(let i=0; i<req.memo.writeUser.length; i++){
            const user= await User.findById(req.memo.writeUser[i])
            user.memoList=user.memoList.filter((element) => element !== req.memo.writeUser[i])
            await user.save()
        }
        for(let i=0; i<req.memo.readUser.length; i++){
            const user= await User.findById(req.memo.readUser[i])
            user.memoList=user.memoList.filter((element) => element !== req.memo.readUser[i])
            await user.save()
        }
        await Memo.findByIdAndRemove(req.memo._id)
        res.json({message:"Memo was deleted"})
    }else{
        res.status(401).send("Not authorized.Only owner can delete it")
    }
})
