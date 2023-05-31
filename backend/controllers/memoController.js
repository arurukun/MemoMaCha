import asyncHandler from "express-async-handler"
import Memo from "../models/memoModel.js"

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