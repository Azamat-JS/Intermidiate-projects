const {Router} = require('express');
const router = Router()
const {register, verify, login, logOut} = require('../controllers/auth_ctr')
const {authValidate, verifyValidate, loginValidate} = require('../middleware/authValidMiddle');
const refresh = require('../middleware/refreshToken');


router.post('/register', authValidate, register)
router.post('/verify',verifyValidate, verify)
router.post('/login', loginValidate, login)
router.post('/refresh', refresh)
router.post('/logout', logOut)

module.exports = router