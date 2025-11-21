import Warranty from "../models/warrantyModel.js";

export const createWarrantyService = (data) => Warranty.create(data);

export const getWarrantiesService = () =>
  Warranty.find().populate("category", "name description");

export const getWarrantyByIdService = (id) =>
  Warranty.findById(id).populate("category", "name");

export const updateWarrantyService = (id, data) =>
  Warranty.findByIdAndUpdate(id, data, { new: true });

export const deleteWarrantyService = (id) => Warranty.findByIdAndDelete(id);
