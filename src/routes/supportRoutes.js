import express from "express";
import {
  createOrUpdateTicket,
  deleteTicket,
  getTickets,
} from "../controllers/supportController.js";
import { protect } from "../middlewares/authMiddleware.js"; // JWT protect middleware

const router = express.Router();

router.post("/", protect, createOrUpdateTicket);
router.delete("/", protect, deleteTicket);
router.get("/", protect, getTickets);

export default router;
