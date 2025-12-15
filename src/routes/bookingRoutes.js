import express from "express";
import {
  createBooking,
  staffAcceptBooking,
} from "../controllers/bookingController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Customer creates booking
router.post("/create", createBooking);

// Staff accepts booking
router.post("/accept/:bookingId", protect, staffAcceptBooking);

export default router;
