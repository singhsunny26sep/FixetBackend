import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    zone: {
      type: String,
      required: true,
    },

    requiredItems: [
      {
        itemId: String,
        name: String,
        qty: Number,
      },
    ],

    bookingType: {
      type: String,
      enum: ["instant", "scheduled"],
      default: "instant",
    },

    bookingDate: {
      type: Date,
      default: Date.now,
    },

    assignedStaff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      default: null,
    },

    status: {
      type: String,
      enum: ["pending", "assigned", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
