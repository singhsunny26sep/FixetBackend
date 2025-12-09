import Car from "../models/carmodel.js";

// ================= CREATE CAR =================
export const createCarService = async (data) => {
  const car = await Car.create(data);
  return car;
};

// ================= GET ALL CARS =================
export const getAllCarsService = async () => {
  const cars = await Car.find().sort({ createdAt: -1 });
  return cars;
};

// ================= GET SINGLE CAR =================
export const getSingleCarService = async (carId) => {
  const car = await Car.findById(carId);

  if (!car) {
    throw new Error("Car not found");
  }

  return car;
};
