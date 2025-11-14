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
  getCategoryByIdService,
} from "../services/categoryService.js";

// CATEGORY CONTROLLERS
export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    // Cloudinary URL
    const image = req.file ? req.file.path : null;

    const category = await createCategoryService({ name, description, image });
    res.status(201).json({ success: true, data: category });
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
    if (req.file) updateData.image = req.file.path; // Cloudinary URL

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
    const { categoryId, subcategories } = req.body;

    // 1. Check category exist
    const category = await Category.findById(categoryId);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    // 2. Create each SubCategory separately
    const newSubCatIds = [];
    for (const sub of subcategories) {
      const newSubCat = await SubCategory.create({
        name: sub.name,
        description: sub.description,
        image: sub.image,
        category: categoryId,
      });
      newSubCatIds.push(newSubCat._id);
    }

    // 3. Push their IDs into Category
    category.subcategories.push(...newSubCatIds);
    await category.save();

    // 4. Populate subcategories (optional)
    const populatedCategory = await Category.findById(categoryId).populate(
      "subcategories"
    );

    res.status(201).json({ success: true, data: populatedCategory });
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
    if (req.file) updateData.image = req.file.path; // Cloudinary URL

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

export const getCategoryById = async (req, res) => {
  try {
    const category = await getCategoryByIdService(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      message: "Category fetched successfully",
      data: category,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
