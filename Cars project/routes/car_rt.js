const express = require('express');
const router = express.Router();
const upload = require('../middleware/multerConfig');
const { tokenChecker, checkAdminToken } = require('../middleware/checkToken');
const { getAllCars, getSingleCar, addCar, updateCar, deleteCar } = require('../controllers/cars');
const { carValidate } = require('../middleware/carValidMiddl');

router.get('/get_cars', tokenChecker, getAllCars);
router.get('/get_one_car/:id', tokenChecker, getSingleCar);
router.post('/add_car', [upload.fields([
  { name: 'model_photo', maxCount: 1 },
  { name: 'external_photo', maxCount: 1 },
  { name: 'inner_photo', maxCount: 1 },
]), carValidate, checkAdminToken], addCar);
router.put('/update_car/:id', checkAdminToken, updateCar);
router.delete('/delete_car/:id', checkAdminToken, deleteCar);

module.exports = router;
