import Category from "../models/categoryModel.js";
import SubCategory from "../models/subCategoryModel.js";

import {
  createCategoryService,
  getCategoriesService,
  updateCategoryService,
  deleteCategoryService,
  createSubCategoryService,
  getSubCategoriesService,
  updateSubCategoryService,
  deleteSubCategoryService,
} from "../services/categoryService.js";

// Helper to get file URL
const getFileUrl = (req, filePath) => {
  return `${req.protocol}://${req.get("host")}/${filePath.replace(/\\/g, "/")}`;
};

// CATEGORY CONTROLLERS
export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    let imageUrl = req.file ? getFileUrl(req, req.file.path) : null;

    const category = await createCategoryService({
      name,
      description,
      image: imageUrl,
    });
    res.json({ success: true, data: category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await getCategoriesService();
    res.json({ success: true, data: categories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    let updateData = { name, description };
    if (req.file) updateData.image = getFileUrl(req, req.file.path);

    const category = await updateCategoryService(req.params.id, updateData);
    res.json({ success: true, data: category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    await deleteCategoryService(req.params.id);
    res.json({ success: true, message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// SUBCATEGORY CONTROLLERS
export const createSubCategory = async (req, res) => {
  try {
    const { categoryId, subcategories } = req.body; // subcategories = array of objects [{name, description}, ...]

    const category = await Category.findById(categoryId);
    if (!category)
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });

    // Push all at once
    category.subcategories.push(...subcategories);
    await category.save();

    res.status(201).json({ success: true, data: category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getSubCategories = async (req, res) => {
  try {
    const subs = await getSubCategoriesService();
    res.json({ success: true, data: subs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateSubCategory = async (req, res) => {
  try {
    const { name, description, categoryId } = req.body;
    let updateData = { name, description, category: categoryId };
    if (req.file) updateData.image = getFileUrl(req, req.file.path);

    const subCat = await updateSubCategoryService(req.params.id, updateData);
    res.json({ success: true, data: subCat });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteSubCategory = async (req, res) => {
  try {
    await deleteSubCategoryService(req.params.id);
    res.json({ success: true, message: "SubCategory deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
