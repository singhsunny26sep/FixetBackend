import mongoose from "mongoose";

// Nested schemas for clarity
const bankDetailsSchema = new mongoose.Schema({
  bankName: String,
  acHolderName: String,
  acNum: String,
  ifsc: String,
  branchName: String,
});

const documentsSchema = new mongoose.Schema({
  aadharFront: String,
  aadharBack: String,
  panCard: String,
  optionalId: String,
  bankDetails: bankDetailsSchema,
});

const staffSchema = new mongoose.Schema(
  {
    phone: { type: String, required: true, unique: true },
    role: { type: String, default: "staff" },
    deviceToken: String, // FCM token
    currentScreen: { type: String, default: "login_screen" },
    isOnboardingCompleted: { type: Boolean, default: false },
    isSubscribed: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    isCheckedIn: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: true },
    isAvailable: { type: Boolean, default: true },

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
    primaryService: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    secondaryServices: [
      { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" },
    ],

    yoe: Number,
    previousExperience: String,
    languagesKnown: [String],
    availability: [String],

    // Profile 3
    preferredWorkZone: String,
    secondaryWorkZone: String,
    willingnessToTravel: String,

    // Profile 4
    documents: documentsSchema,

    // Profile 5
    registrationFee: Number,
    uniformFee: Number,
    uniformSize: String,

    // NEW: Category & SubCategory references
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    subCategories: [
      { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" },
    ],

    // OTP (optional, for auth flow)
    expectedOtp: String,
  },
  { timestamps: true }
);

// Soft delete: automatically filter out deleted staff
staffSchema.pre(/^find/, function (next) {
  this.where({ isDeleted: false });
  next();
});

export default mongoose.model("Staff", staffSchema);
