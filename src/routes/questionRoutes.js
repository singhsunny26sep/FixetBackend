import express from "express";
import {
  createQuestion,
  getQuestions,
  updateQuestion,
  deleteQuestion,
  evaluateAnswers,
} from "../controllers/questionController.js";

const router = express.Router();

// CREATE (single or multiple)
router.post("/questions", createQuestion);

// GET
router.get("/questions", getQuestions);

// UPDATE
router.put("/questions/:id", updateQuestion);

// DELETE
router.delete("/questions/:id", deleteQuestion);

// EVALUATE
router.post("/questions/evaluate", evaluateAnswers);

export default router;
