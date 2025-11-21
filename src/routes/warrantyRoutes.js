import express from "express";
import {
  createWarranty,
  getWarranties,
  getWarranty,
  updateWarranty,
  deleteWarranty,
} from "../controllers/warrantyController.js";

const router = express.Router();

router.post("/", createWarranty);
router.get("/", getWarranties);
router.get("/:id", getWarranty);
router.put("/:id", updateWarranty);
router.delete("/:id", deleteWarranty);

export default router;
