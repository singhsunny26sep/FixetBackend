import express from "express";
import {
  createCategory,
  getCategories,
  deleteCategory,
} from "../controllers/supportcategoryController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { adminProtect } from "../middlewares/adminAuthMiddleware.js";

const router = express.Router();

router.post("/", adminProtect, createCategory); // Admin
router.get("/", protect, getCategories); // Staff/Customer
router.delete("/:id", adminProtect, deleteCategory); // Admin

export default router;
