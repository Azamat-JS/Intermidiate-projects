const router = require('express').Router()
const {getProfile, updateProfile, deleteProfile} = require('../controllers/profil')
const { tokenChecker } = require('../middleware/checkToken')
const ImageUpload = require('../utils/multer')

router.get('/profile', tokenChecker, getProfile)
router.put('/updateProfile', tokenChecker, ImageUpload.singleImage, updateProfile)
router.delete('/deleteProfile', tokenChecker, deleteProfile)

module.exports = router

