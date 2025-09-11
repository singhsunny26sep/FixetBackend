// src/controllers/orderController.js
import { createOrder, verifyPayment } from "../services/orderService.js";

export const createOrderController = async (req, res, next) => {
  try {
    const { amount, currency, notes } = req.body;

    const order = await createOrder(amount, currency, notes);

    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    next(error);
  }
};

export const verifyOrderController = async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const isValid = verifyPayment(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (isValid) {
      res.json({
        success: true,
        message: "Payment verified successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }
  } catch (error) {
    next(error);
  }
};
