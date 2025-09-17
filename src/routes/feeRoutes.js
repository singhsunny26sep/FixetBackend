import express from "express";
import {
  createFee,
  createMultipleFees,
  getFees,
  updateFee,
  deleteFee,
} from "../controllers/feeController.js";

const router = express.Router();

router.post("/", createFee); // single create
router.post("/bulk", createMultipleFees); // multiple create ek sath
router.get("/", getFees); // get all or ?type=uniform
router.put("/:id", updateFee); // update
router.delete("/:id", deleteFee); // delete

export default router;
