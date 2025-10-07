import express from "express";
import { register, login } from "../controllers/adminController.js";
import {
  adminProtect,
  authorizeRoles,
} from "../middlewares/adminAuthMiddleware.js";

const router = express.Router();

// Register (only Super Admin can register others)
router.post("/register", adminProtect, authorizeRoles("superAdmin"), register);

// Login
router.post("/login", login);

// Example protected routes:
router.get(
  "/notifications",
  adminProtect,
  authorizeRoles("superAdmin", "zoneAdmin", "supportAdmin"),
  (req, res) => {
    res.json({ success: true, message: `Welcome ${req.admin.role}` });
  }
);

export default router;
