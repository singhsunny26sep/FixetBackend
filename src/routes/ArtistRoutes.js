import express from "express";
import {
  addArtist,
  getArtists,
  getArtist,
  updateArtist,
  deleteArtist,
  updateStatus,
} from "../controllers/ArtistController.js";

const router = express.Router();

router.post("/add", addArtist);
router.get("/", getArtists);
router.get("/:id", getArtist);
router.put("/:id", updateArtist);
router.delete("/:id", deleteArtist);
router.patch("/status/:id", updateStatus);

export default router;
