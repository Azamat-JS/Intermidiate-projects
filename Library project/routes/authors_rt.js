const {Router} = require('express')
const { getAllAuthors, addAuthor, search, getAuthor, updateAuthor, deleteAuthor } = require('../controllers/authors')
const { authorValidate } = require('../middleware/authorValidMiddl')
const router = Router()
const {checkAdminToken, tokenChecker} = require('../middleware/checkToken')
const ImageUpload = require('../utils/multer')

/**
 * @swagger
 * components:
 *   schemas:
 *     Author:
 *       type: object
 *       required:
 *         - name
 *         - birth_year
 *         - category
 *       properties:
 *         name:
 *           type: string
 *           description: Full name of the author
 *         birth_year:
 *           type: number
 *           description: Year the author was born
 *         death_year:
 *           type: number
 *           description: Year the author passed away (if applicable)
 *         nation:
 *           type: string
 *           description: Nationality of the author
 *         category:
 *           type: string
 *           enum: ["Jadid adabiyoti", "Temuriylar davri", "Mustaqillik davri"]
 *           description: Literary category of the author
 *         image:
 *           type: string
 *           description: URL of the author's image
 */

/**
 * @swagger
 * tags:
 *   - name: Author
 *     description: API for managing authors
 */

/**
 * @swagger
 * /get_authors:
 *   get:
 *     summary: Get all authors
 *     tags: [Author]
 *     responses:
 *       200:
 *         description: List of all authors
 */

/**
 * @swagger
 * /get_one_author/{authorId}:
 *   get:
 *     summary: Get a single author by ID
 *     tags: [Author]
 *     parameters:
 *       - in: path
 *         name: authorId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the author
 *     responses:
 *       200:
 *         description: Author details and books
 *       404:
 *         description: Author not found
 */

/**
 * @swagger
 * /get_authors/search:
 *   get:
 *     summary: Search authors by name
 *     tags: [Author]
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Name of the author to search
 *     responses:
 *       200:
 *         description: List of authors matching the search criteria
 */

/**
 * @swagger
 * /add_author:
 *   post:
 *     summary: Add a new author
 *     tags: [Author]
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
 *               - birth_year
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *               birth_year:
 *                 type: number
 *               death_year:
 *                 type: number
 *               nation:
 *                 type: string
 *               category:
 *                 type: string
 *                 enum: ["Jadid adabiyoti", "Temuriylar davri", "Mustaqillik davri"]
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Author added successfully
 *       400:
 *         description: Image is required or validation error
 *       401:
 *         description: Unauthorized access
 */

/**
 * @swagger
 * /update_author/{authorId}:
 *   put:
 *     summary: Update an author's information
 *     tags: [Author]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: authorId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the author
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               birth_year:
 *                 type: number
 *               death_year:
 *                 type: number
 *               nation:
 *                 type: string
 *               category:
 *                 type: string
 *                 enum: ["Jadid adabiyoti", "Temuriylar davri", "Mustaqillik davri"]
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: The author updated successfully
 *       404:
 *         description: Author not found
 *       401:
 *         description: Unauthorized access
 */

/**
 * @swagger
 * /delete_author/{authorId}:
 *   delete:
 *     summary: Delete an author
 *     tags: [Author]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: authorId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the author to delete
 *     responses:
 *       200:
 *         description: The author deleted successfully
 *       404:
 *         description: Author not found
 *       401:
 *         description: Unauthorized access
 */


router.get('/get_authors', getAllAuthors)
router.get('/get_one_author/:authorId', getAuthor)
router.get('/get_authors/search', search)
router.post('/add_author', checkAdminToken, ImageUpload.singleImage, addAuthor)
router.put('/update_author/:authorId',checkAdminToken, ImageUpload.singleImage, updateAuthor)
router.delete('/delete_author/:authorId', checkAdminToken, deleteAuthor)

module.exports = router