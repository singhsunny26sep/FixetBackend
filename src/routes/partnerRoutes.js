import express from "express";
import { partnerAuth } from "../middlewares/partnerAuth.js";
import { upload } from "../middlewares/upload.js";
import {
  registerPartner,
  uploadDocuments,
  verifyPartner,
  loginPartner,
  getPartnerProfile,
} from "../controllers/partnercontroller.js";

const router = express.Router();

// -------- PARTNER ROUTES --------
router.post("/register", registerPartner);

router.post(
  "/:id/documents",
  upload.fields([
    { name: "shopPhoto", maxCount: 1 },
    { name: "panCard", maxCount: 1 },
    { name: "other", maxCount: 1 },
  ]),
  uploadDocuments
);

router.patch("/admin/:id/verify", verifyPartner);
router.post("/login", loginPartner);
router.get("/profile", partnerAuth, getPartnerProfile);

export default router;
