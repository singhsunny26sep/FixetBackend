import mongoose from "mongoose";

const partnerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    shopName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String },

    gstNumber: { type: String },
    documents: {
      panCard: { type: String },
      shopPhoto: { type: String },
      other: { type: String },
    },

    status: {
      type: String,
      enum: [
        "pending_documents",
        "pending_verification",
        "verified",
        "rejected",
      ],
      default: "pending_documents",
    },

    isVerified: { type: Boolean, default: false },
    verificationNotes: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Partner", partnerSchema);
