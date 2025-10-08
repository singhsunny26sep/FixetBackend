import axios from "axios";
import jwt from "jsonwebtoken";
import Staff from "../models/staffModel.js";
import Customer from "../models/customerModel.js";

const otpStore = new Map(); 
const TWO_FACTOR_API_KEY = process.env.TWO_FACTOR_API_KEY;


const MODELS = {
  staff: Staff,
  customer: Customer,
};


export const sendOtp = async (phone, role = "staff") => {
  console.log("👉 [sendOtp] Role received:", role);

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


export const verifyOtp = async (phone, otp) => {
  const otpData = otpStore.get(phone);
  if (!otpData) throw new Error("OTP not requested");

  const { sessionId, role } = otpData;
  console.log("👉 [verifyOtp] Role retrieved:", role);

  const Model = MODELS[role];
  if (!Model) throw new Error(`Invalid role: ${role}`);

  // ✅ Verify OTP via 2Factor
  const response = await axios.get(
    `https://2factor.in/API/V1/${TWO_FACTOR_API_KEY}/SMS/VERIFY/${sessionId}/${otp}`
  );

  if (response.data.Status !== "Success") throw new Error("Invalid OTP");

  otpStore.delete(phone);

  // ✅ Find or create user
  let user = await Model.findOne({ phone });
  if (!user) user = await Model.create({ phone });

  // ✅ Generate token with correct role
  const token = jwt.sign(
    { id: user._id.toString(), phone: user.phone, role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  // ✅ Populate extra fields if staff
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


export const resendOtp = async (phone, role) => {
  
  const finalRole = role || otpStore.get(phone)?.role || "staff";
  console.log("👉 [resendOtp] Role used:", finalRole);

  const Model = MODELS[finalRole];
  if (!Model) throw new Error(`Invalid role provided: ${finalRole}`);

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
