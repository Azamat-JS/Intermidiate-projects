const {Router} = require('express')
const router = Router()
const {tokenChecker, checkAdminToken} = require('../middleware/checkToken')
const {getAllNotifications, getOneNotification, addNotification, updateNotification, deleteNotification} = require('../controllers/notification_ctr')

router.get('/notifications', tokenChecker, getAllNotifications)
router.get('/notifications/:id', tokenChecker, getOneNotification)
router.post('/create_notification', checkAdminToken, addNotification)
router.put('/update_notification', checkAdminToken, updateNotification)
router.delete('/delete_notification', checkAdminToken, deleteNotification)


module.exports = router