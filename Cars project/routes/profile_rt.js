const router = require('express').Router()
const {getProfile, updateProfile, deleteProfile} = require('../controllers/profile')
const ImageUpload = require('../utils/multer')

router.get('/profile', getProfile)
router.put('/updateProfile', ImageUpload.singleFile, updateProfile)
router.delete('/deleteProfile', deleteProfile)

module.exports = router

