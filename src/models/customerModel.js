// models/customerModel.js
import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    phone: { type: String, required: true, unique: true },
    name: String,
    email: String,
    role: { type: String, default: "customer" },
    currentScreen: { type: String, default: "login_screen" },
    isOnboardingCompleted: { type: Boolean, default: false },
    isSubscribed: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    isCheckedIn: { type: Boolean, default: false },
    secondaryServices: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
    languagesKnown: [String],
    availability: [String],
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    subCategories: [{ type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" }],
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;
