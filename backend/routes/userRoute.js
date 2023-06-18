import express from "express"
const router = express.Router()
import { authUser, getUserProfile, registerUser, searchUser, updataUserProfile } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/login").post(authUser)
router.route("/register").post(registerUser)
router.route("/profile").get(protect,getUserProfile).put(protect,updataUserProfile)
router.route("/search").get(protect,searchUser)

export default router
