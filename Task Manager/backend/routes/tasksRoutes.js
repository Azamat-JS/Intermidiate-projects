const { getTasks, getTaskById, createTask, updateTask, getDashboardData, getUserDashboardData, deleteTask, updateTaskStatus, updateTodoChecklist } = require('../controller/tasksController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

const router = require('express').Router();

router.get('/dashboard-data', protect, getDashboardData);
router.get('/user-dashboard-data', protect, getUserDashboardData);
router.get('/', getTasks);
router.get('/:id', getTaskById);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', protect, adminOnly, deleteTask);
router.put('/:id/status', protect, updateTaskStatus);
router.put('/:id/todo', protect, updateTodoChecklist);

module.exports = router;
