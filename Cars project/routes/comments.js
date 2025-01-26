const {Router} = require('express')
const router = Router()

const {createComment, getAllComments} = require('../controllers/commentAndQuestion')

router.route('/comment').get(getAllComments).post(createComment)


module.exports = router