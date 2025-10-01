import express from "express";
import {
  getProfile,
  updateProfile,
  deleteAccount,
  recoverAccount,
} from "../controllers/staffController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Protected routes
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.delete("/delete-account", protect, deleteAccount);
router.put("/recover-account", protect, recoverAccount);

export default router;
