import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },
    text: { type: String, required: true },
    options: [
      {
        text: String,
        isCorrect: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

// Agar pehle se compiled hai to usko use karo, otherwise naya banao
const Question =
  mongoose.models.Question || mongoose.model("Question", questionSchema);

export default Question;
