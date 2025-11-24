import {
  createPackage,
  getAllPackages,
  getPackageById,
  updatePackage,
  deletePackage,
} from "../services/packageService.js";

export const createPackageController = async (req, res) => {
  try {
    const data = req.body;
    const pkg = await createPackage(data);
    res.status(201).json({ success: true, data: pkg });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPackagesController = async (req, res) => {
  try {
    const packages = await getAllPackages();
    res.status(200).json({ success: true, data: packages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSinglePackageController = async (req, res) => {
  try {
    const id = req.params.id;
    const pkg = await getPackageById(id);
    res.status(200).json({ success: true, data: pkg });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updatePackageController = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const pkg = await updatePackage(id, data);
    res.status(200).json({ success: true, data: pkg });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deletePackageController = async (req, res) => {
  try {
    const id = req.params.id;
    await deletePackage(id);
    res.status(200).json({ success: true, message: "Package deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
