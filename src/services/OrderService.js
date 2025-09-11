// src/services/orderService.js
import Razorpay from "razorpay";
import crypto from "crypto";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// Create order on Razorpay
export const createOrder = async (amount, currency = "INR", notes = {}) => {
  const options = {
    amount: amount * 100, // Razorpay paise main leta hai
    currency,
    notes,
  };
  return await razorpay.orders.create(options);
};

// Verify payment signature
export const verifyPayment = (
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature
) => {
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

  return expectedSignature === razorpay_signature;
};
