import express from "express";
import {
  getAllCustomers,
  getCustomerById,
} from "../controllers/adminCustomerController.js";

const router = express.Router();

// Admin can view all customers
router.get("/customers", getAllCustomers);

// Admin can view single customer details
router.get("/customers/:id", getCustomerById);

export default router;
