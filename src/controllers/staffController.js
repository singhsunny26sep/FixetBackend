import Staff from "../models/staffModel.js";
import Customer from "../models/customerModel.js";
import { recoverStaff } from "../services/staffService.js";


export const getProfile = async (req, res, next) => {
  console.log("Attempting to get profile for ID:", req.user._id);

  try {
    if (!req.user || !req.user._id || !req.user.role) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access — token invalid or missing",
      });
    }

    const userRole = req.user.role;
    let user;

    
    if (userRole === "staff") {
      user = await Staff.findById(req.user._id)
        .populate("categories")
        .populate("subCategories")
        .populate("primaryService")
        .populate("secondaryServices");
    } else if (userRole === "customer") {
      user = await Customer.findById(req.user._id);
    } else {
      return res.status(403).json({
        success: false,
        message: "Invalid role — cannot fetch profile",
      });
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: `${userRole} not found`,
      });
    }

    res.json({
      success: true,
      role: userRole,
      user,
    });
  } catch (err) {
    console.error("❌ Error fetching profile:", err.message);
    next(err);
  }
};

// ----------------------------------------------------------------------
// ✅ Update Profile (Universal for Staff + Customer)
// ----------------------------------------------------------------------
export const updateProfile = async (req, res, next) => {
  try {
    if (!req.user || !req.user._id || !req.user.role) {
      console.log("🚨 DEBUG: Authentication Failed.");
      return res
        .status(403)
        .json({ success: false, message: "Authentication required" });
    }

    const userRole = req.user.role;
    let Model;
    let allowedFields = [];

   
    const staffFields = [
      "name", "email", "currentScreen", "dob", "gender", "profileImage",
      "houseNum", "street", "city", "state", "pincode", "emergencyNumber",
      "primaryService", "secondaryServices", "yoe", "previousExperience",
      "languagesKnown", "availability", "documents", "registrationFee",
      "uniformFee", "uniformSize", "categories", "subCategories", "isCheckedIn",
      "preferredWorkZone", "secondaryWorkZone", "willingnessToTravel",
    ];

 
    const customerFields = [
      "name", "email", "dob", "gender", "profileImage", "houseNum",
      "street", "city", "state", "pincode", "emergencyNumber", "languagesKnown",
    ];

    if (userRole === "staff") {
      Model = Staff;
      allowedFields = staffFields;
    } else if (userRole === "customer") {
      Model = Customer;
      allowedFields = customerFields;
    } else {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized role for update" });
    }

    const updates = {};
    Object.keys(req.body).forEach((key) => {
      if (allowedFields.includes(key)) updates[key] = req.body[key];
    });

    const populateOptions =
      userRole === "staff"
        ? [{ path: "primaryService" }, { path: "secondaryServices" }]
        : [];

    const user = await Model.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true,
    }).populate(populateOptions);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: `${Model.modelName} not found` });
    }

    res.json({ success: true, message: "Profile updated", user });
  } catch (err) {
    console.error("❌ Internal Server Error:", err.message);
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

    const userRole = req.user.role;
    let Model;

    if (userRole === "staff") {
      Model = Staff;
    } else if (userRole === "customer") {
      Model = Customer;
    } else {
      return res
        .status(403)
        .json({ success: false, message: "Invalid role for account deletion" });
    }

    const user = await Model.findByIdAndUpdate(
      req.user._id,
      {
        isDeleted: true,
        deletedReason: reason,
        deletedMessage: message,
      },
      { new: true }
    );

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: `${userRole} not found` });
    }

    res.json({
      success: true,
      message: "Account deleted successfully",
      user,
    });
  } catch (err) {
    next(err);
  }
};


export const recoverAccount = async (req, res, next) => {
  try {
    const userRole = req.user.role;

    if (userRole === "staff") {
      const staff = await recoverStaff(req.user._id);
      if (!staff) {
        return res.status(404).json({
          success: false,
          message: "Staff not found",
        });
      }
      return res.json({
        success: true,
        message: "Staff account recovered successfully",
        staff,
      });
    } else if (userRole === "customer") {
      const customer = await Customer.findByIdAndUpdate(
        req.user._id,
        { isDeleted: false },
        { new: true }
      );
      if (!customer) {
        return res.status(404).json({
          success: false,
          message: "Customer not found",
        });
      }
      return res.json({
        success: true,
        message: "Customer account recovered successfully",
        customer,
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "Invalid role for recovery",
      });
    }
  } catch (err) {
    console.log("Recover error:", err);
    next(err);
  }
};
