import express from "express";
import * as serviceCtrl from "../controllers/eventController.js";
import { upload } from "../middlewares/upload.js";
import {
  adminProtect,
  authorizeRoles,
} from "../middlewares/adminAuthMiddleware.js";

const router = express.Router();

// ✅ Admin: add service
router.post(
  "/add",
  adminProtect,
  // authorizeRoles("admin"), // 👈 role yaha dena zaroori hai
  upload.array("images", 6),
  serviceCtrl.addService
);

// ✅ Admin: update/delete
router.put(
  "/:id",
  adminProtect,
  // authorizeRoles("admin"),
  serviceCtrl.editService
);
router.delete(
  "/:id",
  adminProtect,
  // authorizeRoles("admin"),
  serviceCtrl.removeService
);

// ✅ Public routes
router.get("/", serviceCtrl.listServices);
router.get("/:id", serviceCtrl.getService);

export default router;
