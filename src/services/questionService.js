import Question from "../models/questionModel.js";

// CREATE (single or multiple)
export const createQuestionService = (data) => {
  if (Array.isArray(data)) {
    return Question.insertMany(data);
  }
  return Question.create(data);
};

// GET ALL
export const getQuestionsService = (filter = {}) =>
  Question.find(filter)
    .populate("category", "name")
    .populate("subCategory", "name");

// UPDATE
export const updateQuestionService = (id, data) =>
  Question.findByIdAndUpdate(id, data, { new: true });

// DELETE
export const deleteQuestionService = (id) => Question.findByIdAndDelete(id);

// EVALUATE ANSWERS
export const evaluateAnswersService = async (categoryId, answers) => {
  const questions = await Question.find({ category: categoryId });

  let correctCount = 0;
  let details = [];

  for (const q of questions) {
    const userAnswer = answers.find((a) => a.questionId == q._id);

    if (userAnswer) {
      const correctOption = q.options.find((o) => o.isCorrect);
      const isCorrect =
        correctOption && correctOption._id.toString() === userAnswer.optionId;

      if (isCorrect) correctCount++;

      details.push({
        questionId: q._id,
        question: q.text,
        userAnswer: userAnswer.optionId,
        correctOption: correctOption?._id,
        isCorrect,
      });
    } else {
      details.push({
        questionId: q._id,
        question: q.text,
        userAnswer: null,
        correctOption: q.options.find((o) => o.isCorrect)?._id,
        isCorrect: false,
      });
    }
  }

  return {
    total: questions.length,
    correct: correctCount,
    status: correctCount >= 3 ? "pass" : "fail",
    details,
  };
};
