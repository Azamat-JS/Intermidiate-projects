
const {Router} = require('express')
const router = Router()

const {createComment, getAllComments, updateComment, deleteComment} = require('../controllers/comments')
const {tokenChecker} = require('../middleware/checkToken')

router.route('/comment').get(getAllComments).post(tokenChecker, createComment)
router.route('/comment/:commentId').put(tokenChecker, updateComment).delete(tokenChecker, deleteComment)

module.exports = router