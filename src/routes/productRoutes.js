import express from "express";
import { upload } from "../middlewares/upload.js";
import {
  createProducts,
  getAllProducts,
  updateProductImage,
  deleteProduct,
} from "../controllers/productController.js";
import { adminProtect } from "../middlewares/adminAuthMiddleware.js";
import { partnerAuth } from "../middlewares/partnerAuth.js";

const router = express.Router();

// Partner creates multiple products with images
router.post("/", partnerAuth, upload.array("images", 10), createProducts);

// Get all products (admin or partner)
router.get("/", getAllProducts);

// Admin updates image of a product
router.put(
  "/:id/image",
  adminProtect,
  upload.single("image"),
  updateProductImage
);

// Delete product
router.delete("/:id", adminProtect, deleteProduct);

export default router;
