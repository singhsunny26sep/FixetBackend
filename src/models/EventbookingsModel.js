import mongoose from "mongoose";

const EventbookingsSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    eventDate: { type: Date, required: true },
    bookingDate: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled", "Completed"],
      default: "Pending",
    },
    notes: { type: String, default: "" },
    contactPhone: { type: String },
  },
  { timestamps: true }
);

// FIX: unique model name + prevent re-compiling
export default mongoose.models.Eventbookings ||
  mongoose.model("Eventbookings", EventbookingsSchema);
