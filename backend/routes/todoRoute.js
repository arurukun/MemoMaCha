import express from "express"
const router = express.Router()
import { addReadUser, addWriteUser, createTodo, deleteTodo, editTodo, getListTodo, getTodo } from "../controllers/todoController.js"
import { checkTodoOwner, findTodoById, protect } from "../middleware/authMiddleware.js"

router.route("/selectWriteUser/:id").post(protect,checkTodoOwner,addWriteUser)
router.route("/selectReadUser/:id").post(protect,checkTodoOwner,addReadUser)
router.route("/").post(protect,createTodo)
router.route("/").get(protect,getListTodo)
router.route("/edit/:id").get(protect,getTodo).put(protect,editTodo).delete(protect,findTodoById,deleteTodo)

export default router