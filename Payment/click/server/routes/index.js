const router = require('express').Router()

router.use('/user', require('./user'))
router.use('/click', require('./click'))

module.exports = router
