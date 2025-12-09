import {
  createCarService,
  getAllCarsService,
  getSingleCarService, // service ko import karo
} from "../services/carservice.js";

// CREATE CAR
export const createCar = async (req, res) => {
  try {
    const { brand, model } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Car image is required",
      });
    }

    const image = req.file.path;

    const car = await createCarService({ brand, model, image });

    res.status(201).json({
      success: true,
      message: "Car created successfully",
      data: car,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL CARS
export const getAllCars = async (req, res) => {
  try {
    const cars = await getAllCarsService();
    res.status(200).json({ success: true, data: cars });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET SINGLE CAR
export const getSingleCar = async (req, res) => {
  try {
    const { carId } = req.params;

    const car = await getSingleCarService(carId); // call service function

    res.status(200).json({
      success: true,
      data: car,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
