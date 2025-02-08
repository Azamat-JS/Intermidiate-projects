const router = require('express').Router()
const ImageUpload = require('../utils/multer')

const {getAllCategories, getOneCategory, createCategory} = require('../controllers/categories')
const {checkAdminToken} = require('../middleware/checkToken')

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           enum: ["Jadid adabiyoti", "Temuriylar davri", "Mustaqillik davri", "Jahon adabiyoti"]
 *           description: Name of the category
 *         image:
 *           type: string
 *           description: URL of the category image
 */

/**
 * @swagger
 * tags:
 *   - name: Category
 *     description: API for managing book categories
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: A list of categories
 *       404:
 *         description: Categories not found
 */

/**
 * @swagger
 * /categories/{categoryId}:
 *   get:
 *     summary: Get details of a single category by ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category
 *     responses:
 *       200:
 *         description: Category details with associated authors
 *       404:
 *         description: Category not found
 */

/**
 * @swagger
 * /add_category:
 *   post:
 *     summary: Add a new category
 *     tags: [Category]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - image
 *             properties:
 *               name:
 *                 type: string
 *                 enum: ["Jadid adabiyoti", "Temuriylar davri", "Mustaqillik davri", "Jahon adabiyoti"]
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: New category added successfully
 *       400:
 *         description: Category already exists or image is required
 *       401:
 *         description: Unauthorized access
 */


router.get('/categories', getAllCategories)
router.get('/categories/:categoryId', getOneCategory)
router.post('/add_category', checkAdminToken, ImageUpload.singleImage ,createCategory)

module.exports = router