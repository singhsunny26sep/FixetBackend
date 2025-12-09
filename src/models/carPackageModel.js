import mongoose from "mongoose";

const carPackageSchema = new mongoose.Schema(
  {
    packageType: {
      type: String,
      enum: ["exterior", "interior"],
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    duration: {
      type: String,
      required: true,
    },

    features: {
      type: [String],
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const CarPackage = mongoose.model("CarPackage", carPackageSchema);

export default CarPackage;
