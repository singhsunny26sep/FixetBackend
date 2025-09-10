import Staff from "../models/staffModel.js";

/**
 * PUT /api/staff/profile
 * Update or complete onboarding (all fields optional)
 */
export const updateProfile = async (req, res, next) => {
  try {
    const staffId = req.user._id; // from protect middleware
    const updateData = req.body; // jo bhi fields bheje vo update hoga

    // Find staff
    let staff = await Staff.findById(staffId);
    if (!staff) {
      return res
        .status(404)
        .json({ success: false, message: "Staff not found" });
    }

    // Update sirf wahi fields jo body me hai
    Object.keys(updateData).forEach((key) => {
      staff[key] = updateData[key];
    });

    // Save updated staff
    await staff.save();

    res.json({
      success: true,
      message: "Profile updated successfully",
      staff,
    });
  } catch (err) {
    console.error("Update Profile Error:", err.message);
    next(err);
  }
};

/**
 * GET /api/staff/profile
 * Get profile of logged-in staff
 */
export const getProfile = async (req, res, next) => {
  try {
    const staff = await Staff.findById(req.user._id);
    if (!staff) {
      return res
        .status(404)
        .json({ success: false, message: "Staff not found" });
    }
    res.json({ success: true, staff });
  } catch (err) {
    next(err);
  }
};
