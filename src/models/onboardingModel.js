import mongoose from "mongoose";

const onboardingSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    title: {
      en: { type: String, required: true, trim: true },
      hi: { type: String, trim: true },
      mr: { type: String, trim: true },
    },
    description: {
      en: { type: String, required: true, trim: true },
      hi: { type: String, trim: true },
      mr: { type: String, trim: true },
    },
    role: {
      type: String,
      enum: ["customer", "staff"],
      required: true,
      default: "customer", 
    },
  },
  { timestamps: true }
);

const Onboarding = mongoose.model("Onboarding", onboardingSchema);

export default Onboarding;
