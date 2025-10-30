import Video from "../models/videoModel.js";

// CREATE
export const createVideoService = (data) => Video.create(data);

// READ
export const getVideosService = () =>
  Video.find().populate("category", "name description");

// UPDATE
export const updateVideoService = (id, data) =>
  Video.findByIdAndUpdate(id, data, { new: true });

// DELETE
export const deleteVideoService = (id) => Video.findByIdAndDelete(id);
