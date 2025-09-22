import axios from "axios";
import jwt from "jsonwebtoken";
import Staff from "../models/staffModel.js";

const otpStore = new Map(); // Temporary OTP storage
const TWO_FACTOR_API_KEY = process.env.TWO_FACTOR_API_KEY;

export const sendOtp = async (phone) => {
  const response = await axios.get(
    `https://2factor.in/API/V1/${TWO_FACTOR_API_KEY}/SMS/${phone}/AUTOGEN`
  );
  if (response.data.Status !== "Success") throw new Error("Failed to send OTP");
  otpStore.set(phone, response.data.Details);

  const existingStaff = await Staff.findOne({ phone });
  return {
    message: "OTP sent successfully",
    isAlreadyRegistered: !!existingStaff,
  };
};

export const verifyOtp = async (phone, otp) => {
  const sessionId = otpStore.get(phone);
  if (!sessionId) throw new Error("OTP not requested");

  const response = await axios.get(
    `https://2factor.in/API/V1/${TWO_FACTOR_API_KEY}/SMS/VERIFY/${sessionId}/${otp}`
  );
  if (response.data.Status !== "Success") throw new Error("Invalid OTP");

  otpStore.delete(phone);

  // Check if staff exists or create
  let staff = await Staff.findOne({ phone });
  if (!staff) staff = await Staff.create({ phone });

  // Generate JWT
  const token = jwt.sign(
    { id: staff._id.toString(), phone: staff.phone, role: staff.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  // Populate categories & subCategories
  staff = await Staff.findById(staff._id)
    .populate("categories")
    .populate("subCategories")
    .populate("primaryService")
    .populate("secondaryServices");
  return { token, staff };
};

export const resendOtp = async (phone) => {
  const response = await axios.get(
    `https://2factor.in/API/V1/${TWO_FACTOR_API_KEY}/SMS/${phone}/AUTOGEN`
  );

  if (response.data.Status !== "Success")
    throw new Error("Failed to resend OTP");

  otpStore.set(phone, response.data.Details);

  const existingStaff = await Staff.findOne({ phone });
  return {
    message: "New OTP sent successfully",
    isAlreadyRegistered: !!existingStaff,
  };
};
