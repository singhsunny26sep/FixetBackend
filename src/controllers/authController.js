import * as authService from "../services/authService.js";

export const sendOtp = async (req, res, next) => {
  try {
    const { phone, role } = req.body;

    if (!phone || !/^[0-9]{10}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid 10-digit phone number",
      });
    }

    const result = await authService.sendOtp(phone, role?.trim() || "staff");

    res.json({
      success: true,
      ...result,
    });
  } catch (err) {
    next(err);
  }
};

export const verifyOtp = async (req, res, next) => {
  try {
    const { phone, otp, role } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({
        success: false,
        message: "Phone and OTP are required",
      });
    }

    const { token, user } = await authService.verifyOtp(
      phone,
      otp,
      role?.trim() || "staff"
    );

    res.json({
      success: true,
      message: "OTP verified successfully",
      token,
      user,
    });
  } catch (err) {
    console.error("Error in verifyOtp:", err.message);
    res.status(400).json({
      success: false,
      message: err.message || "Something went wrong",
    });
  }
};

export const resendOtp = async (req, res, next) => {
  try {
    const { phone, role } = req.body;

    if (!phone || !/^[0-9]{10}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid 10-digit phone number",
      });
    }

    const result = await authService.resendOtp(phone, role?.trim() || "staff");

    res.json({
      success: true,
      ...result,
    });
  } catch (err) {
    next(err);
  }
};
