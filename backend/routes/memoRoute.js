import express from "express";
const router=express.Router();
import { createMemo, getListMemo } from "../controllers/memoController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(protect,createMemo)
router.route("/").get(protect,getListMemo)

export default router