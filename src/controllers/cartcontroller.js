import {
  addCartService,
  getCartSummaryService,
  updateCartService,
  removeCartService,
} from "../services/cartservice.js";

// =============== ADD TO CART ==================
export const addToCart = async (req, res) => {
  try {
    const { userId, carId, serviceId } = req.body;

    if (!userId || !carId || !serviceId)
      return res
        .status(400)
        .json({ success: false, message: "All fields required" });

    const cart = await addCartService({ userId, carId, serviceId });

    res.status(201).json({
      success: true,
      message: "Service added to cart",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// =============== GET CART SUMMARY ==================
export const getCartSummary = async (req, res) => {
  try {
    const { userId } = req.query;

    const cart = await getCartSummaryService(userId);

    if (!cart)
      return res.status(404).json({ success: false, message: "Cart empty" });

    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// =============== UPDATE CART ==================
export const updateCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const updated = await updateCartService(userId, req.body);

    res.status(200).json({
      success: true,
      message: "Cart updated",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// =============== REMOVE CART ==================
export const removeCart = async (req, res) => {
  try {
    const { userId } = req.query;

    await removeCartService(userId);

    res.json({ success: true, message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
