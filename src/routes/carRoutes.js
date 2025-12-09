import express from "express";
import { upload } from "../middlewares/upload.js"; // tumhara existing multer
import {
  createCar,
  // addCarPrice,
  getAllCars,
  getSingleCar,
} from "../controllers/carcontroller.js";

const router = express.Router();

router.post("/create", upload.single("image"), createCar);
//router.post("/addPrice", addCarPrice);
router.get("/all", getAllCars);
router.get("/:carId", getSingleCar);

export default router;
