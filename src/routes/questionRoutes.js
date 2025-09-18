import express from "express";
import {
  createQuestion,
  getQuestions,
  updateQuestion,
  deleteQuestion,
  evaluateAnswers,
} from "../controllers/questionController.js";

const router = express.Router();

router.post("/questions", createQuestion);
router.get("/questions", getQuestions);
router.put("/questions/:id", updateQuestion);
router.delete("/questions/:id", deleteQuestion);
router.post("/questions/evaluate", evaluateAnswers);

export default router;
