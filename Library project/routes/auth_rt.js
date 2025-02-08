
const {Router} = require('express');
const router = Router()
const {register, verify, login, refresh, logOut} = require('../controllers/auth_ctr')
const {authValidate, verifyValidate, loginValidate} = require('../middleware/authValidMiddle');



router.post('/register', authValidate, register)

router.post('/verify',verifyValidate, verify)

router.post('/login', loginValidate, login)

router.post('/refresh', refresh)

router.post('/logout', logOut)

module.exports = router