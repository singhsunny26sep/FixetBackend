import mongoose from "mongoose";

const mostBookedServiceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    imageUrl: { type: String, required: true }, // only URL, no file upload
    bookingCount: { type: Number, default: 0 }, // optional field
  },
  { timestamps: true }
);

export default mongoose.model("MostBookedService", mostBookedServiceSchema);
