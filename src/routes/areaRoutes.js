import express from "express";
import {
  createArea,
  getAreas,
  getAreaById,
  updateArea,
  deleteArea,
} from "../controllers/areaController.js";

const router = express.Router();

router.post("/", createArea);
router.get("/", getAreas);
router.get("/:id", getAreaById);
router.put("/:id", updateArea);
router.delete("/:id", deleteArea);

export default router;
