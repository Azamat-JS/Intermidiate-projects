const express = require('express')
const router = express.Router()
const {checkAdminToken} = require('../middleware/checkToken')
const ImageUpload = require('../utils/multer')

const {getSingleBook, getAllBooks, createBook, updateBook, deleteBook} = require('../controllers/books')

router.get('/get_books', getAllBooks)

router.get('/get_one_book/:bookId', getSingleBook)

router.post('/add_book', checkAdminToken, ImageUpload.singleImage, createBook)

router.put('/update_book/:bookId', checkAdminToken,ImageUpload.singleImage, updateBook)

router.delete('/delete_book/:bookId', checkAdminToken, deleteBook)

module.exports = router