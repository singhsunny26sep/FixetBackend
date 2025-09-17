import express from "express";
import {
  createQuestion,
  getQuestions,
  updateQuestion,
  deleteQuestion,
  evaluateAnswers,
} from "../controllers/questionController.js";

const router = express.Router();

// CREATE Question
router.post("/questions", createQuestion);

// GET All Questions (with optional category/subCategory filter)
router.get("/questions", getQuestions);

// UPDATE Question
router.put("/questions/:id", updateQuestion);

// DELETE Question
router.delete("/questions/:id", deleteQuestion);

//  Evaluate Staff Answers (pass/fail check)
router.post("/questions/evaluate", evaluateAnswers);

export default router;
