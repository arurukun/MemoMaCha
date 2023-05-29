import { Schema,model } from "mongoose";

const memoSchema=Schema({
    owner:{type:Schema.Types.ObjectId,required:true,ref:"User"},
    tytle:{type:String,required:true,default:"None"},
    content:{type:String,required:true},
    readUser:[{type:Schema.Types.ObjectId,required:true,ref:"User"}],
    writeUser:[{type:Schema.Types.ObjectId,required:true,ref:"User"}],

    // isSaving:{type:Boolean,required:true,default:false},
    // savingAt:{type:Date},
},{timestamps:true})

const Memo=model("Memo",memoSchema)
export default Memo