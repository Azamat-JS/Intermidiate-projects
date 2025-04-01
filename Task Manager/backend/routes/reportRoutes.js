const { exportTasksReport, exportUsersReport } = require('../controller/reportController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

const router = require('express').Router();


router.get('/export/tasks', protect, adminOnly, exportTasksReport); // Export all tasks as Excell/PDF
router.get('/export/users', protect, adminOnly, exportUsersReport); // Export user-task report

module.exports = router;
