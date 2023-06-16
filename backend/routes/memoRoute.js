import express from "express";
const router=express.Router();
import { addReadUser, addWriteUser, createMemo, deleteMemo, editMemo, getListMemo, getMemo } from "../controllers/memoController.js";
import { checkMemoOwner, findMemoById, protect } from "../middleware/authMiddleware.js";

router.route("/selectWriteUser/:id").post(protect,checkMemoOwner,addWriteUser)
router.route("/selectReadUser/:id").post(protect,checkMemoOwner,addReadUser)
router.route("/edit/:id").get(protect,getMemo).put(protect,editMemo).delete(protect,findMemoById,deleteMemo)
router.route("/").get(protect,getListMemo).post(protect,createMemo)

export default router
