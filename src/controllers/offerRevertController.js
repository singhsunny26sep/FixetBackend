import {
  createOfferService,
  getOffersService,
  getOffersByCategoryService,
  updateOfferService,
  deleteOfferService,
  createRevertService,
  getRevertsService,
  getRevertsByCategoryService,
  updateRevertService,
  deleteRevertService,
} from "../services/offerRevertService.js";
import Category from "../models/categoryModel.js";

// --------------------- OFFER ---------------------
export const createOffer = async (req, res) => {
  try {
    const { title, description, discount, category } = req.body;
    const image = req.file ? req.file.path : null;

    const cat = await Category.findById(category);
    if (!cat)
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });

    const offer = await createOfferService({
      title,
      description,
      discount,
      category,
      image,
    });
    res.status(201).json({ success: true, data: offer });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getOffers = async (req, res) => {
  try {
    const offers = req.query.categoryId
      ? await getOffersByCategoryService(req.query.categoryId)
      : await getOffersService();
    res.json({ success: true, data: offers });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateOffer = async (req, res) => {
  try {
    const { title, description, discount, category } = req.body;
    const updateData = { title, description, discount, category };
    if (req.file) updateData.image = req.file.path;

    const offer = await updateOfferService(req.params.id, updateData);
    res.json({ success: true, data: offer });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteOffer = async (req, res) => {
  try {
    await deleteOfferService(req.params.id);
    res.json({ success: true, message: "Offer deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// --------------------- REVERT ---------------------
export const createRevert = async (req, res) => {
  try {
    const { title, note, category } = req.body;

    const cat = await Category.findById(category);
    if (!cat)
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });

    const revert = await createRevertService({ title, note, category });
    res.status(201).json({ success: true, data: revert });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getReverts = async (req, res) => {
  try {
    const reverts = req.query.categoryId
      ? await getRevertsByCategoryService(req.query.categoryId)
      : await getRevertsService();
    res.json({ success: true, data: reverts });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateRevert = async (req, res) => {
  try {
    const { title, note, category } = req.body;
    const revert = await updateRevertService(req.params.id, {
      title,
      note,
      category,
    });
    res.json({ success: true, data: revert });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteRevert = async (req, res) => {
  try {
    await deleteRevertService(req.params.id);
    res.json({ success: true, message: "Revert deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
