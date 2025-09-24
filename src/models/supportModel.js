import mongoose from "mongoose";

const supportSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, enum: ["staff", "customer"], required: true },
    type: { type: String, enum: ["help", "support"], required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    imageUrl: [{ type: String }],

    status: { type: String, enum: ["open", "closed"], default: "open" },
  },
  { timestamps: true }
);

const Support = mongoose.model("Support", supportSchema);

export default Support;
