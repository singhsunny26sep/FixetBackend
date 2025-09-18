import mongoose from "mongoose";
import Category from "../models/categoryModel.js";
import {
  createQuestionService,
  getQuestionsService,
  updateQuestionService,
  deleteQuestionService,
  evaluateAnswersService,
} from "../services/questionService.js";

// CREATE Questions (multiple per category)
export const createQuestion = async (req, res) => {
  try {
    const { questionsByCategory } = req.body;

    if (!Array.isArray(questionsByCategory)) {
      return res.status(400).json({
        success: false,
        message: "questionsByCategory must be an array",
      });
    }

    let allQuestions = [];

    for (const cat of questionsByCategory) {
      const { category: categoryInput, questions } = cat;
      if (!categoryInput || !Array.isArray(questions)) continue;

      let catId;
      if (mongoose.Types.ObjectId.isValid(categoryInput)) {
        catId = new mongoose.Types.ObjectId(categoryInput);
      } else {
        const categoryDoc = await Category.findOne({ name: categoryInput });
        if (!categoryDoc) continue;
        catId = categoryDoc._id;
      }

      const questionsWithCategory = questions.map((q) => ({
        ...q,
        category: catId,
      }));

      allQuestions = allQuestions.concat(questionsWithCategory);
    }

    if (allQuestions.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid questions found to insert",
      });
    }

    const saved = await createQuestionService(allQuestions);
    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET Questions (random order)
export const getQuestions = async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    if (req.query.subCategory) filter.subCategory = req.query.subCategory;

    const questions = await getQuestionsService(filter);
    res.json({ success: true, data: questions });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// UPDATE Question
export const updateQuestion = async (req, res) => {
  try {
    const question = await updateQuestionService(req.params.id, req.body);
    res.json({ success: true, data: question });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE Question
export const deleteQuestion = async (req, res) => {
  try {
    await deleteQuestionService(req.params.id);
    res.json({ success: true, message: "Question deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// EVALUATE Answers
export const evaluateAnswers = async (req, res) => {
  try {
    const { categoryId, answers } = req.body;
    const result = await evaluateAnswersService(categoryId, answers);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
