const {Router} = require('express')
const router = Router()
const {tokenChecker} = require('../middleware/checkToken')

const {createComment, getAllComments} = require('../controllers/commentAndQuestion')
const {writeQuestion, getAllQuestions} = require('../controllers/commentAndQuestion')

router.route('/comment').get(tokenChecker, getAllComments).post(tokenChecker, createComment)
router.route('/question').get(tokenChecker, getAllQuestions).post(tokenChecker, writeQuestion)

module.exports = router