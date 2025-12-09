import mongoose from "mongoose";

const supportCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      enum: ["Booking", "Service", "Parts", "Bill", "Invoice"],
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const SupportCategory = mongoose.model(
  "SupportCategory",
  supportCategorySchema
);

export default SupportCategory;
