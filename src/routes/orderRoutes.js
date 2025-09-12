// routes/orderRoutes.js
import express from "express";
import { createOrder, verifyOrder } from "../controllers/orderController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Staff/Admin login required
router.post("/create-order", protect, createOrder);
router.put("/verify-order", protect, verifyOrder);

export default router;
