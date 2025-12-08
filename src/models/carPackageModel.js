import mongoose from "mongoose";

const carPackageSchema = new mongoose.Schema(
  {
    carId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },

    packageType: {
      type: String,
      enum: ["exterior", "interior"], // Do type
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    image: {
      type: String, // yaha aap image ka URL save kar sakte ho
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
