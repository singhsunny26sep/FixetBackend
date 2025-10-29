import express from "express";
import {
  sendNotification,
  getNotifications,
} from "../controllers/notificationController.js";
import { adminProtect } from "../middlewares/adminAuthMiddleware.js";

const router = express.Router();

router.post("/send", adminProtect, sendNotification);
router.get("/", adminProtect, getNotifications);

export default router;
