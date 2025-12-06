import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true }, // Decor / DJ / Photo / Catering
    description: { type: String, default: "" },
    price: { type: Number, required: true },
    images: { type: [String], default: [] }, // cloudinary urls
    location: { type: String, required: true }, // e.g. Nagpur
    availableDates: { type: [Date], default: [] },
    isActive: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // admin id
  },
  { timestamps: true }
);

export default mongoose.model("Service", eventSchema);
