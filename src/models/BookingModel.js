// models/Booking.js
import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema({
  address: String,
  lat: Number,
  lng: Number,
});

const TrackingPoint = new mongoose.Schema({
  lat: Number,
  lng: Number,
  speed: Number,
  heading: Number,
  ts: { type: Date, default: Date.now },
});

const BookingSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      default: null,
    },

    // Fields taken from your Figma screenshots:
    serviceType: { type: String, required: true }, // e.g. "Repair", "Move", "Cleaning"
    subService: { type: String }, // optional sub-type from UI
    scheduledFor: { type: Date, required: true }, // scheduled date/time
    quantity: { type: Number, default: 1 }, // if UI has quantity/units
    extras: { type: [String], default: [] }, // extra options (checkboxes)
    notes: { type: String },

    pickup: { type: LocationSchema, required: true },
    drop: { type: LocationSchema }, // optional for some services

    // pricing & payment
    fare: { type: Number, default: 0 }, // in paise (INR) to align with Razorpay
    currency: { type: String, default: "INR" },
    payment: {
      provider: { type: String, default: "razorpay" },
      orderId: String,
      paymentId: String,
      signature: String,
      status: {
        type: String,
        enum: ["unpaid", "created", "paid", "failed", "refunded"],
        default: "unpaid",
      },
      capturedAt: Date,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "assigned",
        "accepted",
        "on_the_way",
        "arrived",
        "in_progress",
        "completed",
        "cancelled",
      ],
      default: "pending",
    },

    timeline: [
      {
        status: String,
        message: String,
        ts: { type: Date, default: Date.now },
      },
    ],

    tracking: [TrackingPoint],

    meta: { type: Object }, // any additional UI metadata from Figma
  },
  { timestamps: true }
);

// useful indexes
BookingSchema.index({ customerId: 1 });
BookingSchema.index({ staffId: 1 });
BookingSchema.index({ status: 1 });
BookingSchema.index({ "pickup.lat": 1, "pickup.lng": 1 });

export const Booking = mongoose.model("Booking", BookingSchema);
