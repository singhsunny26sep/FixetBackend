import * as serviceService from "../services/eventService.js";
import { upload } from "../middlewares/upload.js";

export const addService = async (req, res, next) => {
  try {
    const body = req.body;
    // handle image uploads if files present
    if (req.files && req.files.length) {
      body.images = req.files.map((file) => file.path);
    }

    // set createdBy from req.user if available
    if (req.user) body.createdBy = req.user._id;
    const service = await serviceService.createService(body);
    res.status(201).json({ success: true, service });
  } catch (err) {
    next(err);
  }
};

export const listServices = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    if (req.query.location) filter.location = req.query.location;
    const services = await serviceService.getAllServices(filter);
    res.json({ success: true, services });
  } catch (err) {
    next(err);
  }
};

export const getService = async (req, res, next) => {
  try {
    const service = await serviceService.getServiceById(req.params.id);
    if (!service)
      return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, service });
  } catch (err) {
    next(err);
  }
};

export const editService = async (req, res, next) => {
  try {
    const updated = await serviceService.updateService(req.params.id, req.body);
    res.json({ success: true, service: updated });
  } catch (err) {
    next(err);
  }
};

export const removeService = async (req, res, next) => {
  try {
    await serviceService.deleteService(req.params.id);
    res.json({ success: true, message: "Service removed" });
  } catch (err) {
    next(err);
  }
};
