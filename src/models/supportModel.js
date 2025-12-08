import mongoose from "mongoose";

const supportSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["staff", "customer"],
      required: true,
    },

    category: {
      type: String,
      enum: ["Booking", "Service", "Parts", "Bill", "Invoice"],
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    },
  },
  { timestamps: true }
);

const Support = mongoose.model("Support", supportSchema);

export default Support;
