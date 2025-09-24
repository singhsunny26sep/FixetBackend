import express from "express";
import {
  createOrUpdateTicket,
  deleteTicket,
  getTickets,
} from "../controllers/supportController.js";
import { protect } from "../middlewares/authMiddleware.js"; // JWT protect middleware

const router = express.Router();

// CREATE / UPDATE Ticket → POST
router.post("/", protect, createOrUpdateTicket);

// DELETE Ticket → DELETE
router.delete("/", protect, deleteTicket);

// GET Tickets (role-based) → GET
router.get("/", protect, getTickets);

export default router;
