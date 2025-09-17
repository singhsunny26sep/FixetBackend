import TrainingVideo from "../models/trainingVideoModel.js";

export const createTrainingVideoService = (data) => TrainingVideo.create(data);

export const getTrainingVideosService = (filter = {}) =>
  TrainingVideo.find(filter)
    .populate("category", "name")
    .populate("subCategory", "name");

export const updateTrainingVideoService = (id, data) =>
  TrainingVideo.findByIdAndUpdate(id, data, { new: true });

export const deleteTrainingVideoService = (id) =>
  TrainingVideo.findByIdAndDelete(id);
