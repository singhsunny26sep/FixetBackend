// controllers/booking.controller.js
import bookingService from "../services/bookingService.js";

import crypto from "crypto";

export const createBooking = async (req, res) => {
  try {
    const payload = req.body; // expect UI fields exactly as in Figma screenshots
    const booking = await bookingService.createBooking({
      customerId: req.user._id,
      payload,
    });
    // notify via socket if staff auto-assigned - we'll emit in server socket logic
    return res.status(201).json({ success: true, booking });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

export const estimateFare = async (req, res) => {
  try {
    const payload = req.body;
    const fare = await bookingService.estimateFare(payload);
    return res.json({ success: true, fare });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

export const getBooking = async (req, res) => {
  try {
    const booking = await bookingService.getBooking(req.params.id);
    return res.json({ success: true, booking });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

export const myBookings = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const bookings = await bookingService.listForCustomer(req.user._id, {
      page,
    });
    return res.json({ success: true, bookings });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

export const staffBookings = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const bookings = await bookingService.listForStaff(req.user._id, { page });
    return res.json({ success: true, bookings });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

export const assignStaff = async (req, res) => {
  try {
    const booking = await bookingService.assignStaff(
      req.params.id,
      req.body.staffId
    );
    // emit event via socket to staff/user as needed (see server.js)
    return res.json({ success: true, booking });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
};

export const staffAccept = async (req, res) => {
  try {
    const booking = await bookingService.staffAccept(
      req.params.id,
      req.user._id
    );
    return res.json({ success: true, booking });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status, message } = req.body;
    const booking = await bookingService.updateStatus(
      req.params.id,
      req.user.role,
      status,
      { message }
    );
    return res.json({ success: true, booking });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const booking = await bookingService.cancelBooking(
      req.params.id,
      req.user.role,
      req.body.reason
    );
    return res.json({ success: true, booking });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
};

// Razorpay verify endpoint (controller verifies signature then updates)
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingId,
    } = req.body;
    // verify signature
    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = hmac.digest("hex");
    if (digest !== razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid signature" });
    }
    const booking = await bookingService.verifyRazorpay({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
      bookingId,
    });
    // emit booking payment success if needed
    return res.json({ success: true, booking });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

// webhook endpoint for Razorpay (optional)
export const razorpayWebhook = async (req, res) => {
  // verify webhook signature using header 'x-razorpay-signature'
  // handle payment captured/refunded events
  res.status(200).json({ ok: true });
};
