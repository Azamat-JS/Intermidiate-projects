const router = require('express').Router()

const {getAllCategories, getOneCategory, createCategory} = require('../controllers/categories')

router.get('/', getAllCategories)
router.get('/:id', getOneCategory)
router.post('/add_category', createCategory)

module.exports = router