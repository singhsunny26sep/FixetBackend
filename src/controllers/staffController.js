import Staff from "../models/staffModel.js";
import { recoverStaff } from "../services/staffService.js";

// Get profile
export const getProfile = async (req, res, next) => {
  console.log(req.user._id);
  try {
    const staff = await Staff.findById(req.user._id)
      .populate("categories")
      .populate("subCategories")
      .populate("primaryService")
      .populate("secondaryServices");

    if (!staff)
      return res
        .status(404)
        .json({ success: false, message: "Staff not found" });
    res.json({ success: true, staff });
  } catch (err) {
    next(err);
  }
};

// Update profile
export const updateProfile = async (req, res, next) => {
  try {
    const allowedFields = [
      "name",
      "email",
      "currentScreen",
      "dob",
      "gender",
      "profileImage",
      "houseNum",
      "street",
      "city",
      "state",
      "pincode",
      "emergencyNumber",
      "primaryService",
      "secondaryServices",
      "yoe",
      "previousExperience",
      "languagesKnown",
      "availability",
      "documents",
      "registrationFee",
      "uniformFee",
      "uniformSize",
      "categories",
      "subCategories",
      "isCheckedIn",
      "preferredWorkZone",
      "secondaryWorkZone",
      "willingnessToTravel",
    ];

    const updates = {};
    Object.keys(req.body).forEach((k) => {
      if (allowedFields.includes(k)) updates[k] = req.body[k];
    });

    const staff = await Staff.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true,
    })
      .populate("primaryService")
      .populate("secondaryServices");

    if (!staff)
      return res
        .status(404)
        .json({ success: false, message: "Staff not found" });
    res.json({ success: true, message: "Profile updated", staff });
  } catch (err) {
    next(err);
  }
};

export const deleteAccount = async (req, res, next) => {
  try {
    const { reason, message } = req.body;

    if (!reason || !message) {
      return res.status(400).json({
        success: false,
        message: "Reason and message are required",
      });
    }

    const staff = await Staff.findByIdAndUpdate(
      req.user._id,
      {
        isDeleted: true,
        deletedReason: reason,
        deletedMessage: message,
      },
      { new: true }
    );

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Staff not found",
      });
    }

    res.json({
      success: true,
      message: "Account deleted successfully",
      staff,
    });
  } catch (err) {
    next(err);
  }
};
// asf

export const recoverAccount = async (req, res, next) => {
  try {
    console.log("Recovering staff ID:", req.user._id);
    const staff = await recoverStaff(req.user._id);

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Staff not found",
      });
    }

    res.json({
      success: true,
      message: "Account recovered successfully",
      staff,
    });
  } catch (err) {
    console.log("Recover error:", err);
    next(err);
  }
};
