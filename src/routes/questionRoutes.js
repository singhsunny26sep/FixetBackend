import express from "express";
import {
  createQuestion,
  getQuestions,
  updateQuestion,
  deleteQuestion,
  evaluateAnswers,
} from "../controllers/questionController.js";

const router = express.Router();

// CREATE multiple questions
router.post("/questions", createQuestion);

// GET Questions (random order)
router.get("/questions", getQuestions);

// UPDATE Question by ID
router.put("/questions/:id", updateQuestion);

// DELETE Question by ID
router.delete("/questions/:id", deleteQuestion);

// EVALUATE Answers
router.post("/questions/evaluate", evaluateAnswers);

export default router;
