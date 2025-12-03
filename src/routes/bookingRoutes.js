import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { authRole } from "../middlewares/roleMiddleware.js";

// Import all controllers
import {
  createBooking,
  estimateFare,
  getBooking,
  myBookings,
  staffBookings,
  assignStaff,
  staffAccept,
  updateStatus,
  cancelBooking,
  verifyPayment,
  razorpayWebhook,
} from "../controllers/bookingController.js";

const router = express.Router();

/* ------------------------
      CUSTOMER ROUTES
------------------------- */

// Create booking
router.post("/", protect, createBooking);

// Estimate fare
router.post("/estimate", protect, estimateFare);

// Customer's bookings
router.get("/my", protect, myBookings);

/* ------------------------
         STAFF ROUTES
------------------------- */

router.get("/staff/my", protect, authRole("staff"), staffBookings);

router.put("/staff/:id/accept", protect, authRole("staff"), staffAccept);

/* ------------------------
          ADMIN ROUTES
------------------------- */

router.put("/admin/:id/assign", protect, authRole("admin"), assignStaff);

/* ------------------------
         PAYMENTS
------------------------- */

router.post("/payment/verify", protect, verifyPayment);

// Razorpay webhook
router.post("/webhook/razorpay", razorpayWebhook);

/* ------------------------
       DYNAMIC ROUTES
------------------------- */

// Get booking by ID
router.get("/:id", protect, getBooking);

// Update booking status
router.put("/:id/status", protect, updateStatus);

// Cancel booking
router.post("/:id/cancel", protect, cancelBooking);

export default router;
