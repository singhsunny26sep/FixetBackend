import mongoose from "mongoose";

const supportSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["staff", "customer"],
      required: true,
    },

    type: {
      type: String,
      enum: ["help", "support"],
      required: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SupportCategory",
      required: true,
    },

    title: { type: String, required: true },
    message: { type: String, required: true },

    status: { type: String, enum: ["open", "closed"], default: "open" },
  },
  { timestamps: true }
);

const Support = mongoose.model("Support", supportSchema);
export default Support;
