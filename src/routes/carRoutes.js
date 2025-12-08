import express from "express";
import { upload } from "../middlewares/upload.js"; // tumhara existing multer
import {
  createCar,
  addCarPrice,
  getAllCars,
  getCarPrices,
} from "../controllers/carcontroller.js";

const router = express.Router();

router.post("/create", upload.single("image"), createCar);
router.post("/addPrice", addCarPrice);
router.get("/all", getAllCars);
router.get("/prices/:carId", getCarPrices);

export default router;
