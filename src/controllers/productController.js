import * as productService from "../services/productService.js";

// Create Multiple Products
export const createProducts = async (req, res) => {
  try {
    const partnerId = req.partner?._id;
    const files = req.files;

    // Map images from uploads
    const images = files?.map((file) => file.path);

    // Support multiple products in one request
    const { products } = req.body;
    const parsedProducts =
      typeof products === "string" ? JSON.parse(products) : products;

    const newProducts = await productService.createProducts(
      partnerId,
      parsedProducts,
      images
    );

    res.status(201).json({
      success: true,
      message: "Products created successfully",
      products: newProducts,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

//  Admin approves/rejects product
export const updateProductStatus = async (req, res) => {
  try {
    const { status } = req.body; // approved, rejected, pending
    const product = await productService.updateStatus(req.params.id, status);
    res
      .status(200)
      .json({ success: true, message: "Product status updated", product });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Get All Products (admin or partner)
export const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json({ success: true, products });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Update product image (by Admin only)
export const updateProductImage = async (req, res) => {
  try {
    const { id } = req.params;
    const image = req.file?.path;
    if (!image) throw new Error("No image uploaded");

    const updatedProduct = await productService.updateProductImage(id, image);
    res.status(200).json({
      success: true,
      message: "Product image updated successfully by admin",
      product: updatedProduct,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    await productService.deleteProduct(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
