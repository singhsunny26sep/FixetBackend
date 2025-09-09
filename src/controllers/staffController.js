import * as staffService from "../services/staffService.js";

// Get Profile
export const getProfile = async (req, res, next) => {
  try {
    const staff = await staffService.getStaffById(req.user._id);
    res.json({ success: true, staff });
  } catch (err) {
    next(err);
  }
};

// Update Profile (Step-wise Onboarding)
export const updateProfile = async (req, res, next) => {
  try {
    const { step, ...data } = req.body;
    let updates = {};

    switch (step) {
      case "complete_profile_1":
        updates = { ...data, currentScreen: "complete_profile_2" };
        break;

      case "complete_profile_2":
        updates = { ...data, currentScreen: "complete_profile_3" };
        break;

      case "complete_profile_3":
        updates = { ...data, currentScreen: "complete_profile_4" };
        break;

      case "complete_profile_4":
        updates = { documents: data, currentScreen: "complete_profile_5" };
        break;

      case "complete_profile_5":
        updates = {
          ...data,
          isSubscribed: true,
          currentScreen: "complete_profile_6",
        };
        break;

      case "complete_profile_6":
        updates = { currentScreen: "complete_profile_7" };
        break;

      case "complete_profile_7":
        updates = { currentScreen: "complete_profile_8" };
        break;

      case "complete_profile_8":
        if (data.quizResult === "pass") {
          updates = {
            currentScreen: "home_screen",
            isOnboardingCompleted: true,
          };
        } else {
          updates = { currentScreen: "complete_profile_6" };
        }
        break;

      default:
        return res
          .status(400)
          .json({ success: false, message: "Invalid step" });
    }

    const staff = await staffService.updateStaff(req.user._id, updates);

    res.json({
      success: true,
      message: "Profile updated successfully",
      currentScreen: staff.currentScreen,
      staff,
    });
  } catch (err) {
    next(err);
  }
};
