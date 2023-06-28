import { Schema,model } from "mongoose";


const userSchema=Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,},
    image:{type:String,required:true,default:"\image\image-default.jpeg"},
    memoList:[{type:Schema.Types.ObjectId,required:true,ref:"Memo"}],
    todoList:[{type:Schema.Types.ObjectId,required:true,ref:"Todo"}],
    subscription:{
        subscribtionStatus:{
            type:Boolean, 
            required:true, 
            default:false
        },
        subscribeOn:{
            type:Date
        }, 
        paymentDetails:{type:String}
    }
},{timestamps:true})

const User=model("User",userSchema)
export default User