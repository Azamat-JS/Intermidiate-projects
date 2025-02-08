const express = require('express')
const router = express.Router()
const {checkAdminToken} = require('../middleware/checkToken')
const ImageUpload = require('../utils/multer')

const {getSingleBook, getAllBooks, createBook, updateBook, deleteBook} = require('../controllers/books')

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - name
 *         - genre
 *         - price
 *         - author_info
 *       properties:
 *         name:
 *           type: string
 *           description: Title of the book
 *         genre:
 *           type: string
 *           enum: ["comedy", "drama", "tragedy", "science", "philosophy", "detective"]
 *           description: Genre of the book
 *         price:
 *           type: number
 *           description: Price of the book
 *         rating:
 *           type: number
 *           default: 4.5
 *           description: Average rating of the book
 *         author_info:
 *           type: string
 *           description: ID of the author
 *         image:
 *           type: string
 *           description: URL of the book cover image
 */

/**
 * @swagger
 * tags:
 *   - name: Book
 *     description: API for managing books
 */

/**
 * @swagger
 * /get_books:
 *   get:
 *     summary: Get all books with filtering, sorting, and pagination
 *     tags: [Book]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter books by name
 *       - in: query
 *         name: genre
 *         schema:
 *           type: string
 *         description: Filter books by genre
 *       - in: query
 *         name: numericFilters
 *         schema:
 *           type: string
 *         description: Filter books by numeric values (e.g. price, rating)
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort books by fields (e.g. price,rating)
 *       - in: query
 *         name: fields
 *         schema:
 *           type: string
 *         description: Select specific fields (e.g. name,price)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 5
 *         description: Number of books per page
 *     responses:
 *       200:
 *         description: A list of books with metadata
 */

/**
 * @swagger
 * /get_one_book/{bookId}:
 *   get:
 *     summary: Get details of a single book by ID
 *     tags: [Book]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the book
 *     responses:
 *       200:
 *         description: Book details with comments
 *       404:
 *         description: Book not found
 */

/**
 * @swagger
 * /add_book:
 *   post:
 *     summary: Add a new book
 *     tags: [Book]
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
 *               - genre
 *               - price
 *               - author_info
 *               - rating
 *               - image
 *             properties:
 *               name:
 *                 type: string
 *               genre:
 *                 type: string
 *                 enum: ["comedy", "drama", "tragedy", "science", "philosophy", "detective"]
 *               price:
 *                 type: number
 *               author_info:
 *                 type: string
 *               rating:
 *                 type: number
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Book added successfully
 *       400:
 *         description: Image is required or validation error
 *       401:
 *         description: Unauthorized access
 */

/**
 * @swagger
 * /update_book/{bookId}:
 *   put:
 *     summary: Update a book's information
 *     tags: [Book]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the book
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               genre:
 *                 type: string
 *                 enum: ["comedy", "drama", "tragedy", "science", "philosophy", "detective"]
 *               price:
 *                 type: number
 *               rating:
 *                 type: number
 *               author_info:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: The book updated successfully
 *       404:
 *         description: Book not found
 *       401:
 *         description: Unauthorized access
 */

/**
 * @swagger
 * /delete_book/{bookId}:
 *   delete:
 *     summary: Delete a book
 *     tags: [Book]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the book to delete
 *     responses:
 *       200:
 *         description: The book deleted successfully
 *       404:
 *         description: Book not found
 *       401:
 *         description: Unauthorized access
 */


router.get('/get_books', getAllBooks)
router.get('/get_one_book/:bookId', getSingleBook)
router.post('/add_book', checkAdminToken, ImageUpload.singleImage, createBook)
router.put('/update_book/:bookId', checkAdminToken,ImageUpload.singleImage, updateBook)
router.delete('/delete_book/:bookId', checkAdminToken, deleteBook)

module.exports = router