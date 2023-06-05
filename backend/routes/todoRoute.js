import express from "express"
import { createTodo, editTodo, getListTodo, getTodo } from "../controllers/todoController.js"
import { protect } from "../middleware/authMiddleware.js"
const router = express.Router()

router.route("/").post(protect,createTodo)
router.route("/").get(protect,getListTodo)
router.route("/edit/:id").get(protect,getTodo).put(protect,editTodo)

export default router