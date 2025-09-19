// models/orderModel.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    razorpayOrderId: { type: String, required: true }, // Razorpay Order Id
    paymentId: { type: String }, // Payment Id after payment
    signature: { type: String }, // Razorpay signature after payment
    staffId: { type: mongoose.Schema.Types.ObjectId, ref: "Staff" }, // staff/customer ref
    purpose: { type: String }, // e.g. registration_fee, uniform_fee
    amount: { type: Number }, // amount in paise
    currency: { type: String, default: "INR" },
    status: { type: String, default: "created" }, // created / paid / failed
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
// kjhhh
