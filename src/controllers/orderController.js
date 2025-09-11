// controllers/orderController.js
import Razorpay from "razorpay";
import crypto from "crypto";
import {
  createOrderDb,
  updateOrderByRazorpayId,
} from "../services/orderService.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// POST /api/orders/create
export const createOrder = async (req, res) => {
  try {
    const { amount, currency, notes } = req.body;

    // Razorpay Order create
    const order = await razorpay.orders.create({
      amount,
      currency: currency || "INR",
      notes,
    });

    // DB create
    const dbOrder = await createOrderDb({
      razorpayOrderId: order.id,
      staffId: notes.staffId,
      purpose: notes.purpose,
      amount: order.amount,
      currency: order.currency,
      status: order.status,
    });

    res.json({
      success: true,
      message: "Order created successfully",
      order,
      dbOrderId: dbOrder._id, // 👈 DB Order Id
    });
  } catch (err) {
    console.error("Create Order Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/orders/verify
export const verifyOrder = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid payment signature" });
    }

    // Update order in DB
    const order = await updateOrderByRazorpayId(razorpay_order_id, {
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
      status: "paid",
    });

    res.json({ success: true, message: "Payment verified", order });
  } catch (err) {
    console.error("Verify Order Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
