import mongoose from "mongoose";

const carPriceSchema = new mongoose.Schema(
  {
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },

    carType: {
      type: String,
      required: true,
    },

    serviceName: {
      type: String,
      required: true,
    },

    packageName: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const CarPrice = mongoose.model("CarPrice", carPriceSchema);

export default CarPrice;
