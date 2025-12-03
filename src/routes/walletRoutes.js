import { Router } from "express";
import {
  getWallet,
  createAddMoneyOrder,
  verifyAddMoney,
  deductWallet,
  adminWalletCredit,
} from "../controllers/walletController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", protect, getWallet);

router.post("/add-money/order", protect, createAddMoneyOrder);
router.post("/add-money/verify", protect, verifyAddMoney);

router.post("/deduct", protect, deductWallet);

// ADMIN
router.post("/admin/credit", adminWalletCredit);

export default router;
