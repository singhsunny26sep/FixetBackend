import Staff from "../models/staffModel.js";

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
    ];

    const updates = {};
    Object.keys(req.body).forEach((k) => {
      if (allowedFields.includes(k)) updates[k] = req.body[k];
    });

    const staff = await Staff.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true,
    })
      .populate("categories")
      .populate("subCategories");

    if (!staff)
      return res
        .status(404)
        .json({ success: false, message: "Staff not found" });
    res.json({ success: true, message: "Profile updated", staff });
  } catch (err) {
    next(err);
  }
};
