/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - brand
 *       properties:
 *         brand:
 *           type: string
 *           description: The brand name of the category
 *           example: "Toyota"
 *         image:
 *           type: string
 *           description: The image filename of the category
 *           example: "toyota.jpg"
 */

const { Router } = require("express");
const {
  getAllCategories,
  getOneCategory,
  addCategory,
  updateCategory,
  deleteCategory,
  search,
} = require("../controllers/categories");
const { checkAdminToken, tokenChecker } = require("../middleware/checkToken");
const { categoryValidate } = require("../middleware/categoryValidMiddl");
const upload = require("../utils/multer")

const router = Router();

/**
 * @swagger
 * /categories:
 *   get:
 *     tags:
 *       - Categories
 *     summary: Get all categories
 *     description: Retrieves a list of all car categories (brands).
 *     responses:
 *       200:
 *         description: A list of categories retrieved successfully
 *       500:
 *         description: Internal Server Error
 */
router.get("/categories", tokenChecker, getAllCategories);

/**
 * @swagger
 * /categories/{brand}:
 *   get:
 *     tags:
 *       - Categories
 *     summary: Get all cars in a category
 *     description: Retrieves all cars that belong to a specific brand.
 *     parameters:
 *       - in: path
 *         name: brand
 *         required: true
 *         schema:
 *           type: string
 *         description: The brand name (category) of the cars
 *     responses:
 *       200:
 *         description: List of cars in the specified category
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal Server Error
 */
router.get("/categories/:brand", tokenChecker, getOneCategory);


/**
 * @swagger
 * /category/search:
 *   get:
 *     tags:
 *       - Categories
 *     summary: Search for a category by brand name
 *     description: Searches for a category by brand name using regex.
 *     parameters:
 *       - in: query
 *         name: brand
 *         required: true
 *         schema:
 *           type: string
 *         description: The brand name to search for
 *     responses:
 *       200:
 *         description: Search results returned successfully
 *       500:
 *         description: Internal Server Error
 */
router.get("/category/search", tokenChecker, search);

/**
 * @swagger
 * /add_category:
 *   post:
 *     tags:
 *       - Categories
 *     summary: Add a new category
 *     description: Adds a new category (brand) to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               brand:
 *                 type: string
 *                 description: The brand name of the category
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The category image
 *     responses:
 *       201:
 *         description: Category added successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Internal Server Error
 */
router.post("/add_category", checkAdminToken, upload.single("image"), addCategory);

/**
 * @swagger
 * /update_category/{id}:
 *   put:
 *     tags:
 *       - Categories
 *     summary: Update a category
 *     description: Updates an existing category (brand).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the category to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal Server Error
 */
router.put("/update_category/:id", checkAdminToken, updateCategory);

/**
 * @swagger
 * /delete_category/{id}:
 *   delete:
 *     tags:
 *       - Categories
 *     summary: Delete a category
 *     description: Deletes a category (brand) by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the category to delete
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal Server Error
 */
router.delete("/delete_category/:id", checkAdminToken, deleteCategory);

module.exports = router;
