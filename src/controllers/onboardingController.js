import Onboarding from "../models/onboardingModel.js";

// Create
export const createOnboarding = async (req, res, next) => {
  try {
    const { image, title, description } = req.body;
    const data = await Onboarding.create({ image, title, description });
    res.status(201).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

// Read (with language filter)
export const getOnboarding = async (req, res, next) => {
  try {
    const { lang = "en" } = req.query; // default English
    const data = await Onboarding.find();

    const localizedData = data.map((item) => ({
      _id: item._id,
      image: item.image,
      title: item.title[lang] || item.title.en,
      description: item.description[lang] || item.description.en,
    }));

    res.json({ success: true, data: localizedData });
  } catch (err) {
    next(err);
  }
};

// Update
export const updateOnboarding = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await Onboarding.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

// Delete
export const deleteOnboarding = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Onboarding.findByIdAndDelete(id);
    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};
