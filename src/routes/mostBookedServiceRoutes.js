import express from "express";
import {
  createMostBookedService,
  getMostBookedServices,
  updateMostBookedService,
  deleteMostBookedService,
} from "../controllers/mostBookedServiceController.js";

const router = express.Router();

router.post("/most-booked", createMostBookedService);
router.get("/most-booked", getMostBookedServices);
router.put("/most-booked/:id", updateMostBookedService);
router.delete("/most-booked/:id", deleteMostBookedService);

export default router;
