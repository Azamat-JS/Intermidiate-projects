const router = require('express').Router()

const { getAllAppeals, writeAppeal, deleteAppeal } = require('../controllers/appeals')


router.route('/appeals').get(getAllAppeals).post(writeAppeal)
router.delete('/appeals/:id', deleteAppeal)

module.exports = router