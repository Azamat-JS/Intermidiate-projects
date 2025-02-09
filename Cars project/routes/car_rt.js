
const express = require("express");
const router = express.Router();
const { tokenChecker, checkAdminToken } = require("../middleware/checkToken");
const {fileUploader} = require('../utils/multer')
const {
  getAllCars,
  getSingleCar,
  addCar,
  updateCar,
  deleteCar,
} = require("../controllers/cars");
const { carValidate } = require("../middleware/carValidMiddl");

router.get("/get_cars", tokenChecker, getAllCars);

router.get("/get_one_car/:brand", tokenChecker, getSingleCar);

router.post("/add_car", checkAdminToken, fileUploader, addCar);

router.put("/update_car/:carId", checkAdminToken, updateCar);

router.delete("/delete_car/:carId", checkAdminToken, deleteCar);

module.exports = router;
