import mongoose from "mongoose";

const warrantySchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    title: { type: String, required: true },
    duration: { type: String, required: true }, // e.g. "6 Months", "1 Year"
    description: { type: String, default: "" },
    terms: { type: [String], default: [] },
  },
  { timestamps: true }
);

const Warranty = mongoose.model("Warranty", warrantySchema);
export default Warranty;
