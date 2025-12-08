import Car from "../models/carmodel.js";
import CarPrice from "../models/carpricemodel.js";

// ================= CREATE CAR =================
export const createCarService = async (data) => {
  const car = await Car.create(data);
  return car;
};

// ================= ADD PRICE =================
export const addCarPriceService = async (data) => {
  const carPrice = await CarPrice.create(data);
  return carPrice;
};

// ================= GET ALL CARS =================
export const getAllCarsService = async () => {
  const cars = await Car.find().sort({ createdAt: -1 });
  return cars;
};

// ================= GET PRICES BY CAR =================
export const getCarPricesService = async (carId) => {
  const prices = await CarPrice.find({ car: carId }).populate("car");
  return prices;
};
