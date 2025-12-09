import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    carId: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },

    amount: { type: Number, required: true }, // base service price
    expressFee: { type: Number, default: 0 }, // arrive in 30 mins fee
    discount: { type: Number, default: 0 }, // coupon
    totalAmount: { type: Number, required: true }, // calculated
  },
  { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);
