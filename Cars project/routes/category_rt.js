const {Router} = require('express')
const { getAllCategories, getOneCategory, addCategory, updateCategory, deleteCategory, search } = require('../controllers/categories')
const router = Router()
const {checkAdminToken, tokenChecker} = require('../middleware/checkToken')
const { categoryValidate } = require('../middleware/categoryValidMiddl')


router.get('/categories',tokenChecker, getAllCategories)
router.get('/categories/:brand', tokenChecker, getOneCategory)
router.get('/categories/search', tokenChecker, search)
router.post('/add_category', [categoryValidate, checkAdminToken], addCategory)
router.put('/update_category/:id',checkAdminToken, updateCategory)
router.delete('/delete_category/:id', checkAdminToken, deleteCategory)

module.exports = router