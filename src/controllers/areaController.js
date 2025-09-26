import * as areaService from "../services/areaService.js";

// Create
export const createArea = async (req, res, next) => {
  try {
    const { name, coordinates } = req.body;

    if (!name || !coordinates || coordinates.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Name and coordinates are required",
      });
    }

    const newArea = await areaService.createArea({ name, coordinates });
    res.status(201).json({ success: true, data: newArea });
  } catch (error) {
    next(error);
  }
};

// Get All
export const getAreas = async (req, res, next) => {
  try {
    const areas = await areaService.getAreas();
    res.status(200).json({ success: true, data: areas });
  } catch (error) {
    next(error);
  }
};

// Get by ID
export const getAreaById = async (req, res, next) => {
  try {
    const area = await areaService.getAreaById(req.params.id);
    if (!area) {
      return res
        .status(404)
        .json({ success: false, message: "Area not found" });
    }
    res.status(200).json({ success: true, data: area });
  } catch (error) {
    next(error);
  }
};

// Update
export const updateArea = async (req, res, next) => {
  try {
    const updatedArea = await areaService.updateArea(req.params.id, req.body);
    if (!updatedArea) {
      return res
        .status(404)
        .json({ success: false, message: "Area not found" });
    }
    res.status(200).json({ success: true, data: updatedArea });
  } catch (error) {
    next(error);
  }
};

// Delete
export const deleteArea = async (req, res, next) => {
  try {
    const deletedArea = await areaService.deleteArea(req.params.id);
    if (!deletedArea) {
      return res
        .status(404)
        .json({ success: false, message: "Area not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Area deleted successfully" });
  } catch (error) {
    next(error);
  }
};
