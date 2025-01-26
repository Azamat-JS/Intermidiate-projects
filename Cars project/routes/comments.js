const {Router} = require('express')
const router = Router()

const {createComment, getAllComments} = require('../controllers/comments')

router.route('/comment').get(getAllComments).post(createComment)


module.exports = router