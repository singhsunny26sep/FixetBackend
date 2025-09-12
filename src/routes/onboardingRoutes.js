import express from "express";
import {
  createOnboarding,
  getOnboarding,
  updateOnboarding,
  deleteOnboarding,
} from "../controllers/onboardingController.js";

const router = express.Router();

router.post("/", createOnboarding);
router.get("/", getOnboarding);
router.put("/:id", updateOnboarding);
router.delete("/:id", deleteOnboarding);

export default router;
