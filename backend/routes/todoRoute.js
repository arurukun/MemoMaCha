import express from "express"
import { createTodo, deleteTodo, editTodo, getListTodo, getTodo } from "../controllers/todoController.js"
import { findTodoById, protect } from "../middleware/authMiddleware.js"
const router = express.Router()

router.route("/").post(protect,createTodo)
router.route("/").get(protect,getListTodo)
router.route("/edit/:id").get(protect,getTodo).put(protect,editTodo).delete(protect,findTodoById,deleteTodo)

export default router