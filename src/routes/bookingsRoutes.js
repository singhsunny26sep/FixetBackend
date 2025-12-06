import express from "express";
import * as bookingCtrl from "../controllers/bookingsController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { adminProtect } from "../middlewares/adminAuthMiddleware.js";

const router = express.Router();

router.post("/add", protect, bookingCtrl.createBooking);
router.get("/my", protect, bookingCtrl.myBookings);

// Admin can update status
router.patch("/status/:id", adminProtect, bookingCtrl.updateStatus);

export default router;
