import Service from "../models/eventModel.js";

export const createService = async (data) => Service.create(data);
export const updateService = async (id, data) =>
  Service.findByIdAndUpdate(id, data, { new: true });
export const deleteService = async (id) => Service.findByIdAndDelete(id);
export const getAllServices = async (filter = {}) =>
  Service.find(filter).sort({ createdAt: -1 });
export const getServiceById = async (id) => Service.findById(id);
