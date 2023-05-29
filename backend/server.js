import express from "express"
import dotenv from "dotenv"
import colors from "colors"
import { connected } from "./mongoose.js"
import cors from "cors"
import userRouter from "./routes/userRoute.js"
import memoRouter from "./routes/memoRoute.js"
import todoRouter from "./routes/todoRoute.js"

const app=express()
app.use(cors())
dotenv.config()
app.use(express.json())
connected()

app.use("/api/user",userRouter)
app.use("/api/memo",memoRouter)
app.use("/api/todo",todoRouter)

const PORT=process.env.PORT
app.listen(PORT,console.log(`this is ${PORT}`.rainbow))