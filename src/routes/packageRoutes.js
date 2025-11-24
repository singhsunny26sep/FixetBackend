import express from "express";
import {
  createPackageController,
  getPackagesController,
  getSinglePackageController,
  updatePackageController,
  deletePackageController,
} from "../controllers/packageController.js";

const router = express.Router();

router.post("/create", createPackageController);
router.get("/", getPackagesController);
router.get("/:id", getSinglePackageController);
router.put("/:id", updatePackageController);
router.delete("/:id", deletePackageController);

export default router;
