const {Router} = require('express')
const { getAllAuthors, addAuthor, search, getAuthor, updateAuthor, deleteAuthor } = require('../controllers/authors')
const { authorValidate } = require('../middleware/authorValidMiddl')
const router = Router()
const {checkAdminToken, tokenChecker} = require('../middleware/checkToken')


router.get('/get_authors',tokenChecker, getAllAuthors)
router.get('/get_one_author/:name', tokenChecker, getAuthor)
router.get('/get_authors/search', search)
router.post('/add_author', [authorValidate, checkAdminToken], addAuthor)
router.put('/update_author/:id',checkAdminToken, updateAuthor)
router.delete('/delete_author/:id', checkAdminToken, deleteAuthor)

module.exports = router