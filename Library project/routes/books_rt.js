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
 *         - rating
 *         - author_info
 *       properties:
 *          name:
 *           type: string
 *           description: Name of the book
 *          genre:
 *           type: string
 *           enum: [comedy, drama, tragedy, science, philosophy, detective]
 *           description: Genre of the book
 *          price:
 *           type: number
 *           description: Price of the book
 *          rating:
 *           type: number
 *           description: Rating of the book
 *          author_info:
 *            type: mongoose.Types.ObjectId
 *       example:
 *         name: Life of Pi
 *         genre: philosophy
 *         price: 12000
 *         rating: 4.5
 *         author_info: 67890e8b9f9b4ca0aa926c82
 */


const express = require('express')
const router = express.Router()
const {tokenChecker, checkAdminToken} = require('../middleware/checkToken')
const {deviceLimitMiddleware, detectData} = require('../middleware/deviceLimit')

const {getSingleBook, getAllBooks, createBook, updateBook, deleteBook} = require('../controllers/books')
const { bookValidate } = require('../middleware/booksValidMiddl')


/**
 * @swagger
 * /get_books:
 *   get:
 *     tags:
 *       - Book
 *     summary: Get all books with optional filters, sorting, and pagination
 *     description: Returns a list of books. Supports filtering by name, numeric fields (price, rating), and specific fields to display. Sorting and pagination are also supported.
 *     operationId: getAllBooks
 *     parameters:
 *       - name: name
 *         in: query
 *         description: "Filter books by name (case-insensitive)."
 *         required: false
 *         schema:
 *           type: string
 *       - name: numericFilters
 *         in: query
 *         description: "Filter numeric fields (price, rating) using operators (>, >=, =, <, <=). Example: price>30,rating>=4."
 *         required: false
 *         schema:
 *           type: string
 *       - name: sort
 *         in: query
 *         description: "Sort books by fields. Use comma-separated values for multiple fields. Example: price,-rating."
 *         required: false
 *         schema:
 *           type: string
 *       - name: fields
 *         in: query
 *         description: "Select specific fields to return. Use comma-separated values. Example: name,price,rating."
 *         required: false
 *         schema:
 *           type: string
 *       - name: page
 *         in: query
 *         description: "Page number for pagination (default: 1)."
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: limit
 *         in: query
 *         description: "Number of results per page (default: 5)."
 *         required: false
 *         schema:
 *           type: integer
 *           default: 5
 *     responses:
 *       200:
 *         description: "Successful operation"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 books:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       price:
 *                         type: number
 *                         format: float
 *                       rating:
 *                         type: number
 *                         format: float
 *                       author_info:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                 count:
 *                   type: 
 *                   description: Total number of books returned
 *       400:
 *         description: "Invalid query parameters"
 *       500:
 *         description: "Internal Server Error"
 */



router.get('/get_books', [tokenChecker, deviceLimitMiddleware, detectData], getAllBooks)

/**
 * @swagger
 * /get_one_book/{id}:
 *   get:
 *     tags:
 *       - Book
 *     summary: Get a book by ID
 *     description: Returns a single book with accessToken.
 *     operationId: getSingleBook
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the book to find
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *       400:
 *         description: Invalid ID provided
 *       500:
 *         description: Internal Server Error
 */


router.get('/get_one_book/:id', tokenChecker, getSingleBook)

/**
 * @swagger
 * /add_book:
 *   post:
 *     tags:
 *       - Book
 *     summary: Add a new book to the library
 *     description: You are adding a new book.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Life of Pi"
 *               genre:
 *                 type: string
 *                 example: "science"
 *               price:
 *                 type: integer
 *                 example: 12000
 *               rating:
 *                 type: number
 *                 example: 4.5
 *               comments:
 *                 type: string
 *                 example: "I really liked this book"
 *               author_info:
 *                 type: string
 *                 example: "603d214f8f1a2c23d8e95e8b"
 *             required:
 *               - name
 *               - genre
 *               - price
 *               - author_info
 *     responses:
 *       201:
 *         description: Added to the library
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: "Success"
 *       400:
 *         description: Provide all the required fields!
 *       500:
 *         description: Internal Server Error
 */

router.post('/add_book', [bookValidate, checkAdminToken], createBook)

/**
 * @swagger
 * /update_book/{id}:
 *   put:
 *     tags:
 *       - Book
 *     summary: Update a book by their ID
 *     description: You will update book by ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Hadis va hayot"
 *               genre:
 *                 type: string
 *                 example: science
 *               price:
 *                 type: integer
 *                 example: 13000
 *               rating:
 *                 type: number
 *                 example: 4.5
 *               comments:
 *                 type: string
 *                 example: "It is the best book I have ever read"
 *               author_info:
 *                 type: string
 *                 example: "Uzbek"
 *     responses:
 *       200:
 *         description: Updated the book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Successfully updated"
 *       400:
 *         description: Provide correct id!
 *       500:
 *         description: Internal Server Error
 */
router.put('/update_book/:id', checkAdminToken, updateBook)

/**
 * @swagger
 * /delete_book/{id}:
 *   delete:
 *     tags:
 *       - Book
 *     summary: Deletes book by their ID
 *     description: Delete book by ID
 *     operationId: deleteBook
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Book id to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Successfully deleted"
 *       400:
 *         description: Provide correct id!
 *       500:
 *         description: Internal Server Error
 */
router.delete('/delete_book/:id', checkAdminToken, deleteBook)

module.exports = router