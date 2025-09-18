import Question from "../models/questionModel.js";

// CREATE multiple questions
export const createQuestionService = (data) => Question.create(data);

// GET questions (random order)
export const getQuestionsService = (filter = {}) =>
  Question.aggregate([
    { $match: filter },
    { $sample: { size: 0 } }, // 0 = all matching questions, shuffled randomly
  ]);

// UPDATE question by ID
export const updateQuestionService = (id, data) =>
  Question.findByIdAndUpdate(id, data, { new: true });

// DELETE question by ID
export const deleteQuestionService = (id) => Question.findByIdAndDelete(id);

// Evaluate staff/customer answers
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
