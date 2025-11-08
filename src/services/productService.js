import Product from "../models/productModel.js";

// Create Multiple Products
export const createProducts = async (partnerId, products, images = []) => {
  if (!Array.isArray(products) || products.length === 0)
    throw new Error("Products array required");

  const createdProducts = await Product.insertMany(
    products.map((prod, index) => ({
      ...prod,
      partner: partnerId,
      image: images[index] || "",
    }))
  );

  return createdProducts;
};

// Get all products
export const getAllProducts = async () => {
  return await Product.find().populate("partner", "name shopName email");
};

// Update product image (by Admin)
export const updateProductImage = async (productId, newImageUrl) => {
  const product = await Product.findByIdAndUpdate(
    productId,
    { image: newImageUrl },
    { new: true }
  );
  if (!product) throw new Error("Product not found");
  return product;
};

// Delete Product
export const deleteProduct = async (productId) => {
  const deleted = await Product.findByIdAndDelete(productId);
  if (!deleted) throw new Error("Product not found");
  return deleted;
};
