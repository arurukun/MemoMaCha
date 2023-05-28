import express from "express"
import dotenv from "dotenv"
import colors from "colors"
import { connected } from "./mongoose.js"
import userRouter from "./routes/userRoute.js"
import cors from "cors"

const app=express()
app.use(cors())
dotenv.config()
app.use(express.json())
connected()

app.use("/api/user",userRouter)

const PORT=process.env.PORT
app.listen(PORT,console.log(`this is ${PORT}`.rainbow))