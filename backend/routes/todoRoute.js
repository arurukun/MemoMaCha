import express from "express"
import { createTodo, getListTodo } from "../controllers/todoController.js"
import { protect } from "../middleware/authMiddleware.js"
const router = express.Router()

router.route("/").post(protect,createTodo)
router.route("/").get(protect,getListTodo)

export default router