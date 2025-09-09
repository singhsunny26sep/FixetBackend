import * as authService from "../services/authService.js";

export const sendOtp = async (req, res, next) => {
  try {
    const { phone } = req.body;

    // Phone validation
    if (!phone || !/^[0-9]{10}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid 10-digit phone number",
      });
    }

    const result = await authService.sendOtp(phone);
    res.json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
};

export const verifyOtp = async (req, res, next) => {
  try {
    const { phone, otp } = req.body;
    const { token, staff } = await authService.verifyOtp(phone, otp);
    res.json({
      success: true,
      message: "OTP verified successfully",
      token,
      staff,
    });
  } catch (err) {
    next(err);
  }
};

export const resendOtp = async (req, res, next) => {
  try {
    const { phone } = req.body;
    const result = await authService.resendOtp(phone);
    res.json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
};
