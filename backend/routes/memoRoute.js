import express from "express";
const router=express.Router();
import { createMemo, editMemo, getListMemo, getMemo } from "../controllers/memoController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(protect,createMemo)
router.route("/").get(protect,getListMemo)
router.route("/edit/:id").get(protect,getMemo).put(protect,editMemo)

export default router