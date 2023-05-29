import express from "express"
import { createTodo } from "../controllers/todoController.js"
import { protect } from "../middleware/authMiddleware.js"
const router = express.Router()

router.route("/").post(protect,createTodo)

export default router