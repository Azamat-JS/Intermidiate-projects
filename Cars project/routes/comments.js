const {Router} = require('express')
const router = Router()

const createComment = require('../controllers/comments')

router.post('/comment', createComment)

module.exports = router