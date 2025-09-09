import Staff from "../models/staffModel.js";

export const getStaffById = async (id) => {
  return await Staff.findById(id);
};

export const updateStaff = async (id, updates) => {
  return await Staff.findByIdAndUpdate(id, updates, { new: true });
};
