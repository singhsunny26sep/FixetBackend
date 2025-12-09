import express from "express";
import {
  createTicket,
  deleteTicket,
  getTickets,
} from "../controllers/supportController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { adminProtect } from "../middlewares/adminAuthMiddleware.js";
const router = express.Router();

router.post("/", protect, createTicket);
router.get("/", protect, adminProtect, getTickets);
router.delete("/:id", protect, deleteTicket);

export default router;
