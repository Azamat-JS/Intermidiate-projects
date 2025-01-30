const {Router} = require('express')
const router = Router()

const pressLike = require('../controllers/likes')

router.post('/like', pressLike)

module.exports = router