import express from "express";
import { upload } from "../middlewares/upload.js";
import {
  createOffer,
  getOffers,
  updateOffer,
  deleteOffer,
  createRevert,
  getReverts,
  updateRevert,
  deleteRevert,
} from "../controllers/offerRevertController.js";

const router = express.Router();

// -------- OFFER ROUTES --------
router.post("/offers", upload.single("image"), createOffer);
router.get("/offers", getOffers);
router.put("/offers/:id", upload.single("image"), updateOffer);
router.delete("/offers/:id", deleteOffer);

// -------- REVERT ROUTES --------
router.post("/reverts", createRevert);
router.get("/reverts", getReverts);
router.put("/reverts/:id", updateRevert);
router.delete("/reverts/:id", deleteRevert);

export default router;
//
