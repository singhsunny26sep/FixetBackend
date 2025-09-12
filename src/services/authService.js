import axios from "axios";
import jwt from "jsonwebtoken";
import Staff from "../models/staffModel.js";

const otpStore = new Map(); // Temporary OTP storage
const TWO_FACTOR_API_KEY = process.env.TWO_FACTOR_API_KEY;

// Send OTP using 2Factor
export const sendOtp = async (phone) => {
  try {
    const response = await axios.get(
      `https://2factor.in/API/V1/${TWO_FACTOR_API_KEY}/SMS/${phone}/AUTOGEN`
    );

    if (response.data.Status !== "Success") {
      throw new Error("Failed to send OTP");
    }

    // Store session ID
    otpStore.set(phone, response.data.Details);

    // Check if staff already exists
    const existingStaff = await Staff.findOne({ phone });

    return {
      message: "OTP sent successfully",
      isAlreadyRegistered: !!existingStaff,
    };
  } catch (err) {
    console.error("Send OTP Error:", err.message);
    throw new Error("Unable to send OTP");
  }
};

// Verify OTP using 2Factor
export const verifyOtp = async (phone, otp) => {
  try {
    const sessionId = otpStore.get(phone);
    if (!sessionId) throw new Error("OTP not requested for this number");

    const response = await axios.get(
      `https://2factor.in/API/V1/${TWO_FACTOR_API_KEY}/SMS/VERIFY/${sessionId}/${otp}`
    );

    if (response.data.Status === "Success") {
      otpStore.delete(phone);

      // Check if staff already exists
      let staff = await Staff.findOne({ phone });

      // If not exists → create staff
      if (!staff) {
        staff = await Staff.create({ phone });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: staff._id.toString(), phone: staff.phone, role: staff.role }, // ✅ toString() lagao
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return { token, staff };
    } else {
      throw new Error("Invalid or expired OTP");
    }
  } catch (err) {
    console.error("Verify OTP Error:", err.message);
    throw new Error("OTP verification failed");
  }
};

// Resend OTP using 2Factor
export const resendOtp = async (phone) => {
  try {
    const response = await axios.get(
      `https://2factor.in/API/V1/${TWO_FACTOR_API_KEY}/SMS/${phone}/AUTOGEN`
    );

    if (response.data.Status !== "Success") {
      throw new Error("Failed to resend OTP");
    }

    otpStore.set(phone, response.data.Details);

    // Check if staff already exists
    const existingStaff = await Staff.findOne({ phone });

    return {
      message: "New OTP sent successfully",
      isAlreadyRegistered: !!existingStaff,
    };
  } catch (err) {
    console.error("Resend OTP Error:", err.message);
    throw new Error("Unable to resend OTP");
  }
};
