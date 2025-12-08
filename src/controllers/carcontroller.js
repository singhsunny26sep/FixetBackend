import {
  createCarService,
  addCarPriceService,
  getAllCarsService,
  getCarPricesService,
} from "../services/carservice.js";

// ================= CREATE CAR =================
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

    const car = await createCarService({
      brand,
      model,
      image,
    });

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

// ================= ADD PRICE =================
export const addCarPrice = async (req, res) => {
  try {
    const priceData = await addCarPriceService(req.body);

    res.status(201).json({
      success: true,
      message: "Car price added successfully",
      data: priceData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET ALL CARS =================
export const getAllCars = async (req, res) => {
  try {
    const cars = await getAllCarsService();

    res.status(200).json({
      success: true,
      data: cars,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET PRICES =================
export const getCarPrices = async (req, res) => {
  try {
    const { carId } = req.params;

    const prices = await getCarPricesService(carId);

    res.status(200).json({
      success: true,
      data: prices,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
