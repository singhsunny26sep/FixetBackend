import {
  createCarPackageService,
  getCarPackagesService,
  getCarPackageByIdService,
  updateCarPackageService,
  deleteCarPackageService,
} from "../services/carPackageService.js";

export const createCarPackage = async (req, res) => {
  try {
    const result = await createCarPackageService(req.body);

    res.status(201).json({
      success: true,
      message: "Car package created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCarPackages = async (req, res) => {
  try {
    const { carId } = req.params;

    const result = await getCarPackagesService(carId);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCarPackageById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await getCarPackageByIdService(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Package not found",
      });
    }

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateCarPackage = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await updateCarPackageService(id, req.body);

    res.status(200).json({
      success: true,
      message: "Package updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteCarPackage = async (req, res) => {
  try {
    const { id } = req.params;

    await deleteCarPackageService(id);

    res.status(200).json({
      success: true,
      message: "Package deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
