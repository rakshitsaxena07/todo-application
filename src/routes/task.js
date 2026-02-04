const express = require('express');
const createTask = require('../controllers/tasks/createTask');
const fetchTasks = require('../controllers/tasks/fetchTasks');
const updateTask = require('../controllers/tasks/updateTask');

const router = express.Router();

router.post('/', createTask);
router.get('/', fetchTasks);
router.patch('/:id', updateTask);
module.exports = router;