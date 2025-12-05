import mongoose from "mongoose";

const artistSchema = new mongoose.Schema(
  {
    fullName: String,
    role: {
      type: String,
      enum: ["Event Planner", "Decorator", "DJ", "Photographer", "Artist"],
    },
    categories: [String],

    phone: String,
    email: String,
    workArea: String,
    experience: Number,
    teamSize: Number,
    serviceCapability: String,

    portfolioImages: [String],

    rateCard: {
      birthday: Number,
      engagement: Number,
      haldi: Number,
      babyShower: Number,
      corporate: Number,
      customDecor: Number,
    },

    addOns: [
      {
        name: String,
        price: Number,
      },
    ],

    documents: {
      aadhar: String,
      pan: String,
      gst: String,
    },

    bankDetails: {
      accountHolder: String,
      accountNumber: String,
      ifsc: String,
      bankName: String,
    },

    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Approved", "Rejected", "Suspended"],
    },
  },
  { timestamps: true }
);

const Artist = mongoose.model("Artist", artistSchema);
export default Artist;
