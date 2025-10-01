import Staff from "../models/staffModel.js";

export const getStaffById = async (id) => {
  return await Staff.findById(id);
};

export const updateStaff = async (id, updates) => {
  return await Staff.findByIdAndUpdate(id, updates, { new: true });
};

export const softDeleteStaff = async (id) => {
  return await Staff.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
};

export const recoverStaff = async (id) => {
  // Use updateOne to bypass pre-hook
  await Staff.updateOne(
    { _id: id },
    { $set: { isDeleted: false, deletedReason: null, deletedMessage: null } }
  );

  // Return the updated staff
  return await Staff.findById(id); // normal findById after recovery
};
