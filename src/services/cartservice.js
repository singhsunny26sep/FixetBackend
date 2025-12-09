import Cart from "../models/cartmodel.js";
import Service from "../models/carPackageModel.js";

export const addCartService = async (data) => {
  const service = await Service.findById(data.serviceId);

  if (!service) throw new Error("Service not found");

  const totalAmount = service.price;

  return await Cart.create({
    ...data,
    amount: service.price,
    totalAmount,
  });
};

export const getCartSummaryService = async (userId) => {
  return await Cart.findOne({ userId }).populate("carId").populate("serviceId");
};

export const updateCartService = async (userId, data) => {
  const cart = await Cart.findOne({ userId });

  if (!cart) throw new Error("Cart not found");

  if (data.expressFee !== undefined) cart.expressFee = data.expressFee;
  if (data.discount !== undefined) cart.discount = data.discount;

  cart.totalAmount = cart.amount + cart.expressFee - cart.discount;

  return await cart.save();
};

export const removeCartService = async (userId) => {
  return await Cart.findOneAndDelete({ userId });
};
