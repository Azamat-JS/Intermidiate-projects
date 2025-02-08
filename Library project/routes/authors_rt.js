const {Router} = require('express')
const { getAllAuthors, addAuthor, search, getAuthor, updateAuthor, deleteAuthor } = require('../controllers/authors')
const { authorValidate } = require('../middleware/authorValidMiddl')
const router = Router()
const {checkAdminToken, tokenChecker} = require('../middleware/checkToken')
const ImageUpload = require('../utils/multer')

router.get('/get_authors', getAllAuthors)


router.get('/get_one_author/:id', getAuthor)


router.get('/get_authors/search', search)


router.post('/add_author', checkAdminToken, ImageUpload.singleImage, addAuthor)


router.put('/update_author/:id',checkAdminToken, updateAuthor)


router.delete('/delete_author/:id', checkAdminToken, deleteAuthor)

module.exports = router