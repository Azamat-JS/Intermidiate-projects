const router = require('express').Router()
const {getProfile, updateProfile, deleteProfile} = require('../controllers/profile')
const ImageUpload = require('../utils/multer')
const {tokenChecker} = require('../middleware/checkToken')

router.get('/profile', tokenChecker, getProfile)
router.put('/updateProfile', tokenChecker, ImageUpload.singleFile, updateProfile)
router.delete('/deleteProfile', tokenChecker, deleteProfile)

module.exports = router

