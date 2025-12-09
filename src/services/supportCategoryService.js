import SupportCategory from "../models/supportcategoryModel.js";

export const createCategory = async ({ name, description }) => {
  return await SupportCategory.create({ name, description });
};

export const getAllCategories = async () => {
  return await SupportCategory.find().sort({ createdAt: -1 });
};

export const deleteCategory = async ({ id }) => {
  return await SupportCategory.findByIdAndDelete(id);
};

export const getCategoryById = async ({ id }) => {
  return await SupportCategory.findById(id);
};
