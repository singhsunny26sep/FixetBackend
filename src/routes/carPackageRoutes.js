import express from "express";
import {
  createCarPackage,
  getCarPackages,
  getCarPackageById,
  updateCarPackage,
  deleteCarPackage,
} from "../controllers/carPackageController.js";

const router = express.Router();

// Admin kisi bhi car ke liye package create kare
router.post("/create", createCarPackage);

// Kisi car ke sab packages
router.get("/car/:carId", getCarPackages);

// Specific package by ID
router.get("/:id", getCarPackageById);

// Update package
router.put("/update/:id", updateCarPackage);

// Delete package
router.delete("/delete/:id", deleteCarPackage);

export default router;
