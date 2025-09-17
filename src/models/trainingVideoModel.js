import mongoose from "mongoose";

const trainingVideoSchema = new mongoose.Schema(
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
    title: { type: String, required: true },
    description: String,
    videoUrl: { type: String, required: true }, // YouTube/Vimeo/Cloud URL
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const TrainingVideo = mongoose.model("TrainingVideo", trainingVideoSchema);

export default TrainingVideo;
