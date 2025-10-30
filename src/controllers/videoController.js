import {
  createVideoService,
  getVideosService,
  updateVideoService,
  deleteVideoService,
} from "../services/videoService.js";
import Category from "../models/categoryModel.js";

// CREATE VIDEO
export const createVideo = async (req, res) => {
  try {
    const { title, description, videoUrl, category } = req.body;

    const cat = await Category.findById(category);
    if (!cat) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    const video = await createVideoService({
      title,
      description,
      videoUrl,
      category,
    });
    res.status(201).json({ success: true, data: video });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET ALL VIDEOS
export const getVideos = async (req, res) => {
  try {
    const videos = await getVideosService();
    res.json({ success: true, data: videos });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// UPDATE VIDEO
export const updateVideo = async (req, res) => {
  try {
    const { title, description, videoUrl, category } = req.body;
    const updateData = { title, description, videoUrl, category };

    const updated = await updateVideoService(req.params.id, updateData);
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE VIDEO
export const deleteVideo = async (req, res) => {
  try {
    await deleteVideoService(req.params.id);
    res.json({ success: true, message: "Video deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
