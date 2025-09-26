import mongoose from "mongoose";

const coordinateSchema = new mongoose.Schema({
  lat: { type: Number, required: true },
  long: { type: Number, required: true },
});

const areaSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    coordinates: {
      type: [coordinateSchema],
      required: true,
      validate: {
        validator: function (v) {
          return v.length > 0; // km se km 1 coordinate hona chahiye
        },
        message: "At least one coordinate is required",
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Area", areaSchema);
