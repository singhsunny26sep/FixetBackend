import {
  addCartService,
  addPackageCartService,
  getCartSummaryService,
  updateCartService,
  removeCartService,
} from "../services/cartservice.js";

// =============== ADD TO CART ==================
export const addToCart = async (req, res) => {
  try {
    const { userId, carId, serviceId, packageId } = req.body;
    let cart;
    if (userId && packageId) {
      cart = await addPackageCartService({ userId, packageId });
    } else if (userId && carId && serviceId) {
      cart = await addCartService({ userId, carId, serviceId });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "All fields required" });
    }
    res.status(201).json({
      success: true,
      message: "Service and package added to cart",
      data: cart,
    });
  } catch (error) {
    console.log("error on add cart", error);
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
