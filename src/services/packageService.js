import Package from "../models/packageModel.js";

export const createPackage = async (data) => {
  const pkg = new Package(data);
  return await pkg.save();
};

export const getAllPackages = async () => {
  return await Package.find().populate("categoryId subCategoryId");
};

export const getPackageById = async (id) => {
  return await Package.findById(id).populate("categoryId subCategoryId");
};

export const updatePackage = async (id, data) => {
  return await Package.findByIdAndUpdate(id, data, { new: true });
};

export const deletePackage = async (id) => {
  return await Package.findByIdAndDelete(id);
};
