import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    partner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Partner",
      required: true,
    },
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String, required: true }, // partner will select category
    image: { type: String },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    adminImage: { type: String }, // admin can replace image
  },

  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
