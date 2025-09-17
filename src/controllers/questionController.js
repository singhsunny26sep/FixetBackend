import {
  createQuestionService,
  getQuestionsService,
  updateQuestionService,
  deleteQuestionService,
  evaluateAnswersService,
} from "../services/questionService.js";

// CREATE
export const createQuestion = async (req, res) => {
  try {
    const question = await createQuestionService(req.body);
    res.status(201).json({ success: true, data: question });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET ALL
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

// UPDATE
export const updateQuestion = async (req, res) => {
  try {
    const question = await updateQuestionService(req.params.id, req.body);
    res.json({ success: true, data: question });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE
export const deleteQuestion = async (req, res) => {
  try {
    await deleteQuestionService(req.params.id);
    res.json({ success: true, message: "Question deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Evaluate Answers
export const evaluateAnswers = async (req, res) => {
  try {
    const { categoryId, answers } = req.body;
    const result = await evaluateAnswersService(categoryId, answers);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
