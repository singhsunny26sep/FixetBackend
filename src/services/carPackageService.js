import CarPackage from "../models/carPackageModel.js";

export const createCarPackageService = async (data) => {
  const newPackage = new CarPackage(data);
  return await newPackage.save();
};

export const getCarPackagesService = async (carId) => {
  return await CarPackage.find({ carId });
};

export const getCarPackageByIdService = async (id) => {
  return await CarPackage.findById(id);
};

export const updateCarPackageService = async (id, data) => {
  return await CarPackage.findByIdAndUpdate(id, data, { new: true });
};

export const deleteCarPackageService = async (id) => {
  return await CarPackage.findByIdAndDelete(id);
};
