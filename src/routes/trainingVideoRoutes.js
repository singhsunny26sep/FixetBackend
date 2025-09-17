import express from "express";
import {
  createTrainingVideo,
  getTrainingVideos,
  updateTrainingVideo,
  deleteTrainingVideo,
} from "../controllers/trainingVideoController.js";

const router = express.Router();

router.post("/", createTrainingVideo);
router.get("/", getTrainingVideos);
router.put("/:id", updateTrainingVideo);
router.delete("/:id", deleteTrainingVideo);

export default router;
