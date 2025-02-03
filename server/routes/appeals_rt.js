const router = require('express').Router()

const { getAllAppeals, writeAppeal, deleteAppeal, getTodaysAppeals, getYesterdaysAppeals } = require('../controllers/appeals')


router.route('/appeals').get(getAllAppeals).post(writeAppeal)
router.get('/appealsYesterday', getYesterdaysAppeals)
router.get('/appealsToday', getTodaysAppeals)
router.delete('/appeals/:id', deleteAppeal)

module.exports = router