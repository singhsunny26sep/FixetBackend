import * as cityService from "../services/cityService.js";


export const createCity = async (req, res, next) => {
  try {
    const data = req.body; 

    const citiesArray = Array.isArray(data) ? data : [data];

  
    for (const city of citiesArray) {
      if (!city.name || !city.code) {
        return res.status(400).json({
          success: false,
          message: "Each city must have name and code",
        });
      }
    }

 
    const createdCities = [];
    for (const city of citiesArray) {
      const newCity = await cityService.createCity(city);
      createdCities.push(newCity);
    }

    res.status(201).json({ success: true, data: createdCities });
  } catch (error) {
    next(error);
  }
};


export const getCities = async (req, res, next) => {
  try {
    const cities = await cityService.getCities();
    res.status(200).json({ success: true, data: cities });
  } catch (error) {
    next(error);
  }
};


export const getCityById = async (req, res, next) => {
  try {
    const city = await cityService.getCityById(req.params.id);
    if (!city) {
      return res
        .status(404)
        .json({ success: false, message: "City not found" });
    }
    res.status(200).json({ success: true, data: city });
  } catch (error) {
    next(error);
  }
};


export const updateCity = async (req, res, next) => {
  try {
    const updatedCity = await cityService.updateCity(req.params.id, req.body);
    if (!updatedCity) {
      return res
        .status(404)
        .json({ success: false, message: "City not found" });
    }
    res.status(200).json({ success: true, data: updatedCity });
  } catch (error) {
    next(error);
  }
};


export const deleteCity = async (req, res, next) => {
  try {
    const deletedCity = await cityService.deleteCity(req.params.id);
    if (!deletedCity) {
      return res
        .status(404)
        .json({ success: false, message: "City not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "City deleted successfully" });
  } catch (error) {
    next(error);
  }
};
