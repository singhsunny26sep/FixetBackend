import express from "express";
import {
  addToCart,
  getCartSummary,
  updateCart,
  removeCart,
} from "../controllers/cartcontroller.js";

const router = express.Router();

router.post("/add", addToCart);
router.get("/summary", getCartSummary);
router.patch("/update", updateCart);
router.delete("/remove", removeCart);

export default router;
