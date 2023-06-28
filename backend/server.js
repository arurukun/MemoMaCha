import express from "express"
import dotenv from "dotenv"
import colors from "colors"
import { connected } from "./mongoose.js"
import cors from "cors"
import userRouter from "./routes/userRoute.js"
import memoRouter from "./routes/memoRoute.js"
import todoRouter from "./routes/todoRoute.js"
import uploadRouter from "./routes/uploadRoute.js"
import path from "path"

const app=express()
app.use(cors("*"))
dotenv.config()
app.use(express.json())
connected()

// console.log(path.resolve()+"\\server.js")

// This will return the image on path 
// http://localhost:5055/static/images/image-1687495265708.jpeg
// C:\Users\aruru\OneDrive\Desktop\Memo\backend\uploads\images\image-1687495265708.jpeg
// return file(inside+variable) /static/:variable
// path.resolve() = "C:\Users\aruru\OneDrive\Desktop\Memo\backend"+"\uploads"+id
app.use("/static", express.static(path.resolve()+"/uploads") )
// express.static(path.resolve()+"/uploads" + "/images/image-1687495265708.jpeg")

app.use("/api/user",userRouter)
app.use("/api/memo",memoRouter)
// user.findbyid(id)
app.use("/api/todo",todoRouter)

//this will save the image and send you location of image
// location will be after /uploads because you split it.
app.use("/api/uploadApi",uploadRouter)
// now you can save this image location in database


const PORT=process.env.PORT
app.listen(PORT,console.log(`this is ${PORT}`.rainbow))