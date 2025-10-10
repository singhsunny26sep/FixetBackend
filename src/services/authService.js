import axios from "axios";
import jwt from "jsonwebtoken";
import Staff from "../models/staffModel.js";
import Customer from "../models/customerModel.js";

const otpStore = new Map(); // Temporary OTP storage
const TWO_FACTOR_API_KEY = process.env.TWO_FACTOR_API_KEY;

const MODELS = {
  staff: Staff,
  customer: Customer,
};

// ✅ Send OTP
export const sendOtp = async (phone, role = "staff") => {
  const Model = MODELS[role];
  if (!Model) throw new Error(`Invalid role provided: ${role}`);

  const response = await axios.get(
    `https://2factor.in/API/V1/${TWO_FACTOR_API_KEY}/SMS/${phone}/AUTOGEN`
  );

  if (response.data.Status !== "Success") throw new Error("Failed to send OTP");

  otpStore.set(phone, { sessionId: response.data.Details, role });

  const existingUser = await Model.findOne({ phone });

  return {
    success: true,
    message: "OTP sent successfully",
    isAlreadyRegistered: !!existingUser,
    role,
  };
};

// ✅ Verify OTP
export const verifyOtp = async (phone, otp, deviceToken = null) => {
  const otpData = otpStore.get(phone);
  if (!otpData) throw new Error("OTP not requested");

  const { sessionId, role } = otpData;
  const Model = MODELS[role];
  if (!Model) throw new Error(`Invalid role: ${role}`);

  // Verify OTP via 2Factor
  const response = await axios.get(
    `https://2factor.in/API/V1/${TWO_FACTOR_API_KEY}/SMS/VERIFY/${sessionId}/${otp}`
  );

  if (response.data.Status !== "Success") throw new Error("Invalid OTP");

  otpStore.delete(phone);

  // Find or create user
  let user = await Model.findOne({ phone });
  if (!user) user = await Model.create({ phone });

  // Update deviceToken if provided
  if (deviceToken) {
    user.deviceToken = deviceToken;
    await user.save();
  }

  // Generate JWT
  const token = jwt.sign(
    { id: user._id.toString(), phone: user.phone, role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  // Populate staff fields if staff
  if (role === "staff") {
    user = await Staff.findById(user._id)
      .populate("categories")
      .populate("subCategories")
      .populate("primaryService")
      .populate("secondaryServices");
  }

  return {
    success: true,
    message: "OTP verified successfully",
    token,
    user,
    role,
  };
};

// ✅ Resend OTP
export const resendOtp = async (phone) => {
  const finalRole = otpStore.get(phone)?.role || "staff";
  const Model = MODELS[finalRole];
  if (!Model) throw new Error(`Invalid role: ${finalRole}`);

  const response = await axios.get(
    `https://2factor.in/API/V1/${TWO_FACTOR_API_KEY}/SMS/${phone}/AUTOGEN`
  );

  if (response.data.Status !== "Success")
    throw new Error("Failed to resend OTP");

  otpStore.set(phone, { sessionId: response.data.Details, role: finalRole });

  const existingUser = await Model.findOne({ phone });

  return {
    success: true,
    message: "New OTP sent successfully",
    isAlreadyRegistered: !!existingUser,
    role: finalRole,
  };
};
