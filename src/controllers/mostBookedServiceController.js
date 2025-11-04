import Category from "../models/categoryModel.js";
import {
  createMostBookedServiceService,
  getMostBookedServicesService,
  updateMostBookedServiceService,
  deleteMostBookedServiceService,
} from "../services/mostBookedServiceService.js";

// CREATE
export const createMostBookedService = async (req, res) => {
  try {
    const { name, description, imageUrl, category, bookingCount } = req.body;

    const cat = await Category.findById(category);
    if (!cat) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    const service = await createMostBookedServiceService({
      name,
      description,
      imageUrl,
      category,
      bookingCount,
    });

    res.status(201).json({ success: true, data: service });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// READ
export const getMostBookedServices = async (req, res) => {
  try {
    const services = await getMostBookedServicesService();
    res.json({ success: true, data: services });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// UPDATE
export const updateMostBookedService = async (req, res) => {
  try {
    const { name, description, imageUrl, category, bookingCount } = req.body;
    const updateData = { name, description, imageUrl, category, bookingCount };

    const updated = await updateMostBookedServiceService(
      req.params.id,
      updateData
    );
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE
export const deleteMostBookedService = async (req, res) => {
  try {
    await deleteMostBookedServiceService(req.params.id);
    res.json({ success: true, message: "Service deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
