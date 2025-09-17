import Question from "../models/questionModel.js";

export const createQuestionService = (data) => Question.create(data);

export const getQuestionsService = (filter = {}) =>
  Question.find(filter)
    .populate("category", "name")
    .populate("subCategory", "name");

export const updateQuestionService = (id, data) =>
  Question.findByIdAndUpdate(id, data, { new: true });

export const deleteQuestionService = (id) => Question.findByIdAndDelete(id);

// ✅ Staff ke answers check karne ke liye
export const evaluateAnswersService = async (categoryId, answers) => {
  const questions = await Question.find({ category: categoryId });

  let correctCount = 0;

  questions.forEach((q) => {
    const userAnswer = answers.find((a) => a.questionId == q._id);
    if (userAnswer) {
      const correctOption = q.options.find((o) => o.isCorrect);
      if (
        correctOption &&
        correctOption._id.toString() === userAnswer.optionId
      ) {
        correctCount++;
      }
    }
  });

  return {
    total: questions.length,
    correct: correctCount,
    status: correctCount >= 3 ? "pass" : "fail",
  };
};
