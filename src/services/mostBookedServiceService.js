import MostBookedService from "../models/mostBookedServiceModel.js";

// CREATE
export const createMostBookedServiceService = (data) =>
  MostBookedService.create(data);

// READ
export const getMostBookedServicesService = () =>
  MostBookedService.find().populate("category", "name description");

// UPDATE
export const updateMostBookedServiceService = (id, data) =>
  MostBookedService.findByIdAndUpdate(id, data, { new: true });

// DELETE
export const deleteMostBookedServiceService = (id) =>
  MostBookedService.findByIdAndDelete(id);
