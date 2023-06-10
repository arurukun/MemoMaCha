import express from "express";
const router=express.Router();
import { createMemo, deleteMemo, editMemo, getListMemo, getMemo } from "../controllers/memoController.js";
import { findMemoById, protect } from "../middleware/authMiddleware.js";
import { searchUser } from "../controllers/userController.js";

router.route("/").post(protect,createMemo)
router.route("/").get(protect,getListMemo)
// router.route("/edit/:id/?").get(protect,findMemoById,searchUser)
router.route("/edit/:id").get(protect,getMemo).put(protect,editMemo).delete(protect,findMemoById,deleteMemo)

export default router
