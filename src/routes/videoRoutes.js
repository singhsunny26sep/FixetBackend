import express from "express";
import {
  createVideo,
  getVideos,
  updateVideo,
  deleteVideo,
} from "../controllers/videoController.js";

const router = express.Router();

router.post("/videos", createVideo);
router.get("/videos", getVideos);
router.put("/videos/:id", updateVideo);
router.delete("/videos/:id", deleteVideo);

export default router;
