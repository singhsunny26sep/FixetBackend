import Offer from "../models/offerModel.js";
import Revert from "../models/revertModel.js";

// --------------------- OFFER ---------------------
export const createOfferService = (data) => Offer.create(data);
export const getOffersService = () => Offer.find().populate("category", "name");
export const getOffersByCategoryService = (categoryId) =>
  Offer.find({ category: categoryId }).populate("category", "name");
export const updateOfferService = (id, data) =>
  Offer.findByIdAndUpdate(id, data, { new: true });
export const deleteOfferService = (id) => Offer.findByIdAndDelete(id);

// --------------------- REVERT ---------------------
export const createRevertService = (data) => Revert.create(data);
export const getRevertsService = () =>
  Revert.find().populate("category", "name");
export const getRevertsByCategoryService = (categoryId) =>
  Revert.find({ category: categoryId }).populate("category", "name");
export const updateRevertService = (id, data) =>
  Revert.findByIdAndUpdate(id, data, { new: true });
export const deleteRevertService = (id) => Revert.findByIdAndDelete(id);
