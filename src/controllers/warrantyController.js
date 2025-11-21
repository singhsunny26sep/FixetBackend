import {
  createWarrantyService,
  getWarrantiesService,
  getWarrantyByIdService,
  updateWarrantyService,
  deleteWarrantyService,
} from "../services/warrantyService.js";

export const createWarranty = async (req, res) => {
  try {
    const warranty = await createWarrantyService(req.body);
    res.status(201).json({ success: true, data: warranty });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getWarranties = async (req, res) => {
  try {
    const warranties = await getWarrantiesService();
    res.status(200).json({ success: true, data: warranties });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getWarranty = async (req, res) => {
  try {
    const warranty = await getWarrantyByIdService(req.params.id);
    if (!warranty)
      return res
        .status(404)
        .json({ success: false, message: "Warranty not found" });

    res.status(200).json({ success: true, data: warranty });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateWarranty = async (req, res) => {
  try {
    const warranty = await updateWarrantyService(req.params.id, req.body);
    if (!warranty)
      return res
        .status(404)
        .json({ success: false, message: "Warranty not found" });

    res.status(200).json({ success: true, data: warranty });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteWarranty = async (req, res) => {
  try {
    const warranty = await deleteWarrantyService(req.params.id);
    if (!warranty)
      return res
        .status(404)
        .json({ success: false, message: "Warranty not found" });

    res
      .status(200)
      .json({ success: true, message: "Warranty deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
