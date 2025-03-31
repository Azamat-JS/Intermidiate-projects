const { getDashboardData, getUserDashboardData } = require('../controller/tasksController');
const { getUsers, getUserById } = require('../controller/userController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

const router = require('express').Router();

router.get('/', protect, adminOnly, getUsers);
router.get('/:id', protect, getUserById);

module.exports = router;

