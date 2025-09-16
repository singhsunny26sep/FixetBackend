import Category from "../models/categoryModel.js";
import SubCategory from "../models/subCategoryModel.js";

// CATEGORY
export const createCategoryService = (data) => Category.create(data);
export const getCategoriesService = () => Category.find();
export const updateCategoryService = (id, data) =>
  Category.findByIdAndUpdate(id, data, { new: true });
export const deleteCategoryService = (id) => Category.findByIdAndDelete(id);

// SUBCATEGORY
export const createSubCategoryService = (data) => SubCategory.create(data);
export const getSubCategoriesService = () =>
  SubCategory.find().populate("category", "name");
export const updateSubCategoryService = (id, data) =>
  SubCategory.findByIdAndUpdate(id, data, { new: true });
export const deleteSubCategoryService = (id) =>
  SubCategory.findByIdAndDelete(id);
