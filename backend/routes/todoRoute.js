import express from "express"
import { addReadUser, addWriteUser, createTodo, deleteTodo, editTodo, getListTodo, getTodo } from "../controllers/todoController.js"
import { checkTodoOwner, findTodoById, protect } from "../middleware/authMiddleware.js"
import { searchUser } from "../controllers/userController.js"
const router = express.Router()

router.route("/selectReadUser/:id").get(protect,checkTodoOwner,addWriteUser)
router.route("/selectReadUser/:id").get(protect,checkTodoOwner,addReadUser)
router.route("/").post(protect,createTodo)
router.route("/").get(protect,getListTodo)
// router.route("/search").get(protect,findTodoById,searchUser)
router.route("/edit/:id").get(protect,getTodo).put(protect,editTodo).delete(protect,findTodoById,deleteTodo)

export default router