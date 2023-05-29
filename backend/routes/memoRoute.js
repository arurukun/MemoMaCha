import express from "express";
const router=express.Router();
import { createMemo } from "../controllers/memoController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(protect,createMemo)

export default router