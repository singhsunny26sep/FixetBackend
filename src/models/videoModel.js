import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    videoUrl: { type: String, required: true }, // only store URL
  },
  { timestamps: true }
);

export default mongoose.model("Video", videoSchema);
