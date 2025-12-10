import express from "express";
import bookingController from "../controllers/bookingController.js";

const router = express.Router();

router.post("/create", bookingController.createBooking);
router.post("/verify-payment", bookingController.verifyPayment);
router.put("/status/:id", bookingController.updateStatus);
router.put("/assign/:id", bookingController.assignStaff);
router.put("/tracking/:id", bookingController.updateLiveLocation);
router.get("/:id", bookingController.getBooking);
router.get("/customer/:customerId", bookingController.getCustomerBookings);

export default router;
