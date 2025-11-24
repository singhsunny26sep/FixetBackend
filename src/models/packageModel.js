import mongoose from "mongoose";

const packageSchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    longDescription: {
      type: String,
    },
    basePrice: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    finalPrice: {
      type: Number,
      required: false,
    },
    inclusions: [
      {
        type: String,
      },
    ],
    requiredInfo: [
      {
        label: { type: String, required: true },
        type: {
          type: String,
          enum: ["text", "number", "dropdown", "radio", "file"],
          required: true,
        },
        options: { type: [String], default: [] },
        required: { type: Boolean, default: false },
      },
    ],

    duration: {
      type: Number, // in minutes
      default: 60,
    },
    technicians: {
      type: Number,
      default: 1,
    },
    images: [String],
    isFeatured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Auto calculate final price
packageSchema.pre("save", function (next) {
  this.finalPrice = this.basePrice - this.basePrice * (this.discount / 100);
  next();
});

export default mongoose.model("Package", packageSchema);
