import * as supportCategoryService from "../services/supportCategoryService.js";
import SupportCategory from "../models/supportcategoryModel.js";

// CREATE (Admin)
export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const exists = await SupportCategory.findOne({ name });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "Category already exists" });
    }

    const category = await supportCategoryService.createCategory({
      name,
      description,
    });

    res.status(201).json({ success: true, data: category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET (Staff / Customer)
export const getCategories = async (req, res) => {
  try {
    const categories = await supportCategoryService.getAllCategories();
    res.status(200).json({ success: true, data: categories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE (Admin)
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await supportCategoryService.deleteCategory({ id });

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
