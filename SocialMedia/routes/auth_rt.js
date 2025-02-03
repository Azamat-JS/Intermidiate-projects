const router = require('express').Router()
const register = require('../controller/auth_ctr')

router.post('/register', register)

module.exports = router