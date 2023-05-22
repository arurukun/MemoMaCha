import mongoose from "mongoose";
export const connected=async()=>{
    try{
        const connect=await mongoose.connect(process.env.MONGO_URL,{useUnifiedTopology:true})
        console.log(`connected to ${process.env.MONGO_URL}`.rainbow)
    }catch(e){console.log(e)}
}