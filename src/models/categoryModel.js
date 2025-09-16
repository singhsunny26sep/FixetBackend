import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    image: String, // image URL
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);
