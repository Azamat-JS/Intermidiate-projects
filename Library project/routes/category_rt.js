const router = require('express').Router()
const ImageUpload = require('../utils/multer')

const {getAllCategories, getOneCategory, createCategory} = require('../controllers/categories')
const {checkAdminToken} = require('../middleware/checkToken')

router.get('/categories', getAllCategories)
router.get('/categories/:categoryId', getOneCategory)
router.post('/add_category', checkAdminToken, ImageUpload.singleImage ,createCategory)

module.exports = router