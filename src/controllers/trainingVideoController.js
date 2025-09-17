import {
  createTrainingVideoService,
  getTrainingVideosService,
  updateTrainingVideoService,
  deleteTrainingVideoService,
} from "../services/trainingVideoService.js";

// CREATE
export const createTrainingVideo = async (req, res) => {
  try {
    const video = await createTrainingVideoService(req.body);
    res.status(201).json({ success: true, data: video });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET ALL
export const getTrainingVideos = async (req, res) => {
  try {
    // Optionally filter by category/subCategory
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    if (req.query.subCategory) filter.subCategory = req.query.subCategory;

    const videos = await getTrainingVideosService(filter);
    res.json({ success: true, data: videos });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// UPDATE
export const updateTrainingVideo = async (req, res) => {
  try {
    const video = await updateTrainingVideoService(req.params.id, req.body);
    res.json({ success: true, data: video });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE
export const deleteTrainingVideo = async (req, res) => {
  try {
    await deleteTrainingVideoService(req.params.id);
    res.json({ success: true, message: "Training video deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
