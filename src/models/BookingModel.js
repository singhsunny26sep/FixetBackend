import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      default: null, // Assigned later
    },

    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },

    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    scheduleDate: {
      type: String,
      required: true,
    },

    scheduleTime: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["scheduled", "confirmed", "inprogress", "completed", "cancelled"],
      default: "scheduled",
    },

    location: {
      address: String,
      latitude: Number,
      longitude: Number,
    },

    payment: {
      orderId: String,
      paymentId: String,
      signature: String,
      method: String,
      amount: Number,
      status: {
        type: String,
        enum: ["pending", "paid", "failed"],
        default: "pending",
      },
    },

    tracking: {
      liveLocation: {
        lat: Number,
        lng: Number,
      },
      isTrackingActive: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
/// ashfjhd
