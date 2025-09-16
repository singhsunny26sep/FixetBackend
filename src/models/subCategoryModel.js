import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    image: String, // image URL
  },
  { timestamps: true }
);

export default mongoose.model("SubCategory", subCategorySchema);
