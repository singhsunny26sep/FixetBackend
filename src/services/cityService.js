import City from "../models/cityModel.js";


export const createCity = async (data) => {
  const city = new City(data);
  return await city.save();
};

export const getCities = async () => {
  return await City.find();
};


export const getCityById = async (id) => {
  return await City.findById(id);
};


export const updateCity = async (id, data) => {
  return await City.findByIdAndUpdate(id, data, { new: true });
};


export const deleteCity = async (id) => {
  return await City.findByIdAndDelete(id);
};
