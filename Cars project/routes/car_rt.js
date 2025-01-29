const express = require("express");
const router = express.Router();
const { tokenChecker, checkAdminToken } = require("../middleware/checkToken");
const { getAllCars, getSingleCar, addCar, updateCar, deleteCar } = require("../controllers/cars");
const { carValidate } = require("../middleware/carValidMiddl");
const upload = require("../utils/multer");

router.post("/add_car", [upload.array("images", 3), carValidate, checkAdminToken], addCar);
router.get("/get_cars", tokenChecker, getAllCars);
router.get("/get_one_car/:id", tokenChecker, getSingleCar);
router.put("/update_car/:id", checkAdminToken, updateCar);
router.delete("/delete_car/:id", checkAdminToken, deleteCar);

module.exports = router;
