import Fee from "../models/feeModel.js";

// SINGLE CRUD
export const createFeeService = (data) => Fee.create(data);

// Filter wale GET — type ? type=uniform ya registration
export const getFeesService = (type) => {
  const filter = type ? { feeType: type } : {};
  return Fee.find(filter);
};

export const updateFeeService = (id, data) =>
  Fee.findByIdAndUpdate(id, data, { new: true });

export const deleteFeeService = (id) => Fee.findByIdAndDelete(id);

// BULK CREATE
export const createMultipleFeesService = (feesArray) => {
  return Fee.insertMany(feesArray);
};
