/**
 * @swagger
 * components:
 *   schemas:
 *     Car:
 *       type: object
 *       required:
 *         - model
 *         - price
 *         - engine
 *         - year
 *         - color
 *         - distance
 *         - description
 *         - tinting
 *         - category
 *       properties:
 *         model:
 *           type: string
 *           description: The model name of the car
 *           example: "Toyota Corolla"
 *         price:
 *           type: number
 *           description: The price of the car
 *           example: 25000
 *         engine:
 *           type: number
 *           description: The engine power of the car
 *           example: 2.0
 *         year:
 *           type: number
 *           description: The manufacturing year of the car
 *           example: 2023
 *         color:
 *           type: string
 *           description: The color of the car
 *           example: "Red"
 *         distance:
 *           type: number
 *           description: The distance the car has traveled (mileage)
 *           example: 15000
 *         description:
 *           type: string
 *           description: Additional description about the car
 *           example: "Well-maintained, single-owner car with full service history."
 *         tinting:
 *           type: string
 *           enum: [yes, no]
 *           description: Whether the car has tinted windows or not
 *           example: "yes"
 *         category:
 *           type: string
 *           description: The ID of the category the car belongs to
 *           example: "65c4d96bcf3c60a7f6d6e1a7"
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: List of image filenames
 *           example: ["car1.jpg", "car2.jpg"]
 */

const express = require("express");
const router = express.Router();
const { tokenChecker, checkAdminToken } = require("../middleware/checkToken");
const {
  getAllCars,
  getSingleCar,
  addCar,
  updateCar,
  deleteCar,
} = require("../controllers/cars");
const { carValidate } = require("../middleware/carValidMiddl");
const upload = require("../utils/multer");

/**
 * @swagger
 * /get_cars:
 *   get:
 *     tags:
 *       - Cars
 *     summary: Get all cars
 *     description: Retrieves a list of all available cars with optional filters.
 *     parameters:
 *       - in: query
 *         name: model
 *         schema:
 *           type: string
 *         description: Filter cars by model name (case insensitive)
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort results (e.g., "price,-year")
 *       - in: query
 *         name: numericFilters
 *         schema:
 *           type: string
 *         description: Filter by numeric values (e.g., "price>20000,year>=2020")
 *       - in: query
 *         name: fields
 *         schema:
 *           type: string
 *         description: Select specific fields (e.g., "model,price,year")
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of results per page
 *     responses:
 *       200:
 *         description: A list of cars retrieved successfully
 *       500:
 *         description: Internal Server Error
 */
router.get("/get_cars", tokenChecker, getAllCars);

/**
 * @swagger
 * /get_one_car/{id}:
 *   get:
 *     tags:
 *       - Cars
 *     summary: Get details of a single car
 *     description: Retrieves details of a car by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the car
 *     responses:
 *       200:
 *         description: Car details retrieved successfully
 *       404:
 *         description: Car not found
 *       500:
 *         description: Internal Server Error
 */
router.get("/get_one_car/:id", tokenChecker, getSingleCar);

/**
 * @swagger
 * /add_car:
 *   post:
 *     tags:
 *       - Cars
 *     summary: Add a new car
 *     description: Adds a new car to the system with images.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               model:
 *                 type: string
 *               price:
 *                 type: number
 *               engine:
 *                 type: number
 *               year:
 *                 type: number
 *               color:
 *                 type: string
 *               distance:
 *                 type: number
 *               description:
 *                 type: string
 *               tinting:
 *                 type: string
 *                 enum: [yes, no]
 *               category:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Car added successfully
 *       400:
 *         description: Missing required fields or images
 *       500:
 *         description: Internal Server Error
 */

router.post("/add_car", [upload.array("images", 3), carValidate, checkAdminToken], addCar);

/**
 * @swagger
 * /update_car/{id}:
 *   put:
 *     tags:
 *       - Cars
 *     summary: Update car details
 *     description: Updates details of an existing car.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the car to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Car'
 *     responses:
 *       200:
 *         description: Car updated successfully
 *       404:
 *         description: Car not found
 *       500:
 *         description: Internal Server Error
 */
router.put("/update_car/:id", checkAdminToken, updateCar);

/**
 * @swagger
 * /delete_car/{id}:
 *   delete:
 *     tags:
 *       - Cars
 *     summary: Delete a car
 *     description: Deletes a car by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the car to delete
 *     responses:
 *       200:
 *         description: Car deleted successfully
 *       404:
 *         description: Car not found
 *       500:
 *         description: Internal Server Error
 */
router.delete("/delete_car/:id", checkAdminToken, deleteCar);

module.exports = router;
