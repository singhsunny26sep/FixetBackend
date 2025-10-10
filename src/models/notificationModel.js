import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: {
      type: String,
      enum: ["global", "zone", "personal"],
      required: true,
    },
    zones: [{ type: String }], // for SuperAdmin/ZoneAdmin
    recipientId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // 1-to-1
    role: {
      type: String,
      enum: ["superAdmin", "zoneAdmin", "supportAdmin"],
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);
