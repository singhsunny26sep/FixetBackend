import Area from "../models/areaModel.js";

// Create Area
export const createArea = async (data) => {
  const area = new Area(data);
  return await area.save();
};

// Get all Areas
export const getAreas = async () => {
  return await Area.find();
};

// Get single Area by ID
export const getAreaById = async (id) => {
  return await Area.findById(id);
};

// Update Area
export const updateArea = async (id, data) => {
  return await Area.findByIdAndUpdate(id, data, { new: true });
};

// Delete Area
export const deleteArea = async (id) => {
  return await Area.findByIdAndDelete(id);
};
