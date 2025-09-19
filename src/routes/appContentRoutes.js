import express from "express";
import {
  createContent,
  updateContent,
  deleteContent,
  getContent,
} from "../controllers/appContentController.js";

const router = express.Router();

// CRUD
router.post("/content", createContent); // create
router.put("/content", updateContent); // update
router.delete("/content", deleteContent); // delete
router.get("/content", getContent); // read (role-based)

export default router;
