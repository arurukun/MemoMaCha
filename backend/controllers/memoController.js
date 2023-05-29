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

