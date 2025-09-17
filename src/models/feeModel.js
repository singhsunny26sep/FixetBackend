import mongoose from "mongoose";

const feeSchema = new mongoose.Schema(
  {
    feeType: {
      type: String,
      required: true,
      enum: ["registration", "uniform", "other"],
    },
    amount: { type: Number, required: true },
    description: String,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Fee = mongoose.model("Fee", feeSchema);

export default Fee;
