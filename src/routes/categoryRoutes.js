import express from "express";
import { upload } from "../middlewares/upload.js";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  createSubCategory,
  getSubCategories,
  updateSubCategory,
  deleteSubCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

// Category Routes
router.post("/categories", upload.single("image"), createCategory);
router.get("/categories", getCategories);
router.put("/categories/:id", upload.single("image"), updateCategory);
router.delete("/categories/:id", deleteCategory);

// SubCategory Routes
router.post("/subcategories", upload.single("image"), createSubCategory);
router.get("/subcategories", getSubCategories);
router.put("/subcategories/:id", upload.single("image"), updateSubCategory);
router.delete("/subcategories/:id", deleteSubCategory);

export default router;
