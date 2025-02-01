const router = require('express').Router()
const {getUsers} = require('../controller/user_ctr')

router.get('/', getUsers)


module.exports = router