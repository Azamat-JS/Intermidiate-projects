const express = require('express')
const router = express.Router()
const {tokenChecker, checkAdminToken} = require('../middleware/checkToken')

const {getSingleBook, getAllBooks, createBook, updateBook, deleteBook} = require('../controllers/books')
const { bookValidate } = require('../middleware/bookValidMiddl')

router.get('/get_books', tokenChecker,getAllBooks)
router.get('/get_one_book/:id', tokenChecker, getSingleBook)
router.post('/add_book', [bookValidate, checkAdminToken], createBook)
router.put('/update_book/:id',checkAdminToken, updateBook)
router.delete('/delete_book/:id',checkAdminToken, deleteBook)

module.exports = router