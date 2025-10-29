import * as authService from "../services/authService.js";

// ✅ Send OTP
export const sendOtp = async (req, res, next) => {
  try {
    const { phone, role } = req.body;
    if (!phone || !/^[0-9]{10}$/.test(phone))
      return res
        .status(400)
        .json({ success: false, message: "Invalid phone number" });

    const result = await authService.sendOtp(phone, role?.trim() || "staff");
    res.json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
};

// ✅ Verify OTP
export const verifyOtp = async (req, res, next) => {
  try {
    const { phone, otp, role, deviceToken } = req.body;
    if (!phone || !otp)
      return res
        .status(400)
        .json({ success: false, message: "Phone and OTP required" });

    const result = await authService.verifyOtp(phone, otp, deviceToken);
    res.json(result);
  } catch (err) {
    console.error("Error in verifyOtp:", err.message);
    res
      .status(400)
      .json({ success: false, message: err.message || "Something went wrong" });
  }
};

// ✅ Resend OTP
export const resendOtp = async (req, res, next) => {
  try {
    const { phone } = req.body;
    if (!phone || !/^[0-9]{10}$/.test(phone))
      return res
        .status(400)
        .json({ success: false, message: "Invalid phone number" });

    const result = await authService.resendOtp(phone);
    res.json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
};
