import asyncHandler from "express-async-handler"
import Memo from "../models/memoModel.js"
import Todo from "../models/todoModel.js"
import { Types } from "mongoose";

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
    const memo=await req.body
    if(memo){
        // const memo.tytle=req.body.tytle||
    }else{
        res.status(404).send("Memo is not found")
    }
})