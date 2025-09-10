import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
  {
    phone: { type: String, required: true, unique: true },
    role: { type: String, default: "staff" },
    currentScreen: { type: String, default: "login_screen" },
    isOnboardingCompleted: { type: Boolean, default: false },
    isSubscribed: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },

    // Profile 1
    name: String,
    email: String,
    dob: Date,
    gender: String,
    profileImage: String,
    houseNum: String,
    street: String,
    city: String,
    state: String,
    pincode: String,
    emergencyNumber: String,

    // Profile 2
    primaryService: String,
    secondaryServices: [String],
    yoe: Number,
    previousExperience: String,
    languagesKnown: [String],
    availability: [String],

    // Profile 3 (skip for now)
    preferredWorkZone: { zoneName: String },
    secondaryWorkZone: { zoneName: String },
    willingnessToTravel: String,

    // Profile 4
    documents: {
      aadharFront: String,
      aadharBack: String,
      panCard: String,
      optionalId: String,
      bankDetails: {
        bankName: String,
        acHolderName: String,
        acNum: String,
        ifsc: String,
        branchName: String,
      },
    },

    // Profile 5
    registrationFee: Number,
    uniformFee: Number,
    //uniformAddress: String,
    uniformSize: String,
  },
  { timestamps: true }
);

export default mongoose.model("Staff", staffSchema);
