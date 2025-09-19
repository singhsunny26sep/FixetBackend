import mongoose from "mongoose";

const appContentSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["terms", "privacy", "about"], required: true },
    language: { type: String, required: true },
    role: { type: String, enum: ["staff", "customer"], required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

// Agar pehle se compiled hai to usko use karo, otherwise naya banao
const AppContent =
  mongoose.models.AppContent || mongoose.model("AppContent", appContentSchema);

export default AppContent;
