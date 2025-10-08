import Onboarding from "../models/onboardingModel.js";


export const createOnboarding = async (req, res, next) => {
  try {
    const { image, title, description, role } = req.body;


    if (!["customer", "staff"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role. Must be 'customer' or 'staff'.",
      });
    }

    const data = await Onboarding.create({ image, title, description, role });

    res.status(201).json({
      success: true,
      data: {
        _id: data._id,
        image: data.image,
        title: data.title,
        description: data.description,
        role: data.role,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getOnboarding = async (req, res, next) => {
  try {
    const { lang = "en", role } = req.query;


    const filter = role ? { role } : {};

   
    const data = await Onboarding.find(filter);

    const localizedData = data.map((item) => ({
      _id: item._id,
      image: item.image,
      title: item.title[lang] || item.title.en,
      description: item.description[lang] || item.description.en,
      role: item.role,
    }));

    res.json({ success: true, data: localizedData });
  } catch (err) {
    next(err);
  }
};


export const updateOnboarding = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (role && !["customer", "staff"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role. Must be 'customer' or 'staff'.",
      });
    }

    const data = await Onboarding.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!data) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    res.json({
      success: true,
      data: {
        _id: data._id,
        image: data.image,
        title: data.title,
        description: data.description,
        role: data.role,
      },
    });
  } catch (err) {
    next(err);
  }
};


export const deleteOnboarding = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await Onboarding.findByIdAndDelete(id);
    if (!data) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};
