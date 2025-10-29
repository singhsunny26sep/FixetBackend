import mongoose from "mongoose";

const revertSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    note: String,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("revert", revertSchema);
