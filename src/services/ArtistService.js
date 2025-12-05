import Artist from "../models/Artistmodel.js";

export const createArtist = async (data) => {
  return await Artist.create(data);
};

export const getAllArtists = async () => {
  return await Artist.find();
};

export const getArtistById = async (id) => {
  return await Artist.findById(id);
};

export const updateArtist = async (id, data) => {
  return await Artist.findByIdAndUpdate(id, data, { new: true });
};

export const deleteArtist = async (id) => {
  return await Artist.findByIdAndDelete(id);
};

export const changeArtistStatus = async (id, status) => {
  return await Artist.findByIdAndUpdate(id, { status }, { new: true });
};
