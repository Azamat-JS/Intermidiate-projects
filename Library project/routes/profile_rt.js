const router = require('express').Router()
const {getProfile, updateProfile, deleteProfile} = require('../controllers/profil')
const { tokenChecker } = require('../middleware/checkToken')

router.get('/profile/:id', tokenChecker, getProfile)
router.put('/updateProfile', tokenChecker, updateProfile)
router.delete('/deleteProfile', tokenChecker, deleteProfile)

module.exports = router

