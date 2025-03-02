const clickController = require('../controllers/click.controller')
const userController = require('../controllers/user.controller')
const userMiddleware = require('../middlewares/user.middleware')
const router = require('express').Router()

router.post('/prepare', clickController.prepare)
router.post('/complete', clickController.complete)
router.post('/checkout', userMiddleware, clickController.checkout)

module.exports = router