// src/routes/orderRoutes.js
import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  createOrderController,
  verifyOrderController,
} from "../controllers/orderController.js";

const router = express.Router();

// Create Order
router.post("/create-order", protect, createOrderController);

// Verify Order
router.put("/verify-order", protect, verifyOrderController);

export default router;
