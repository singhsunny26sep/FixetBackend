// services/orderService.js
import Order from "../models/orderModel.js";

export const createOrderDb = async (data) => {
  return await Order.create(data);
};

export const updateOrderByRazorpayId = async (razorpayOrderId, updates) => {
  return await Order.findOneAndUpdate({ razorpayOrderId }, updates, {
    new: true,
  });
};
