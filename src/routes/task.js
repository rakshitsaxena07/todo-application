const express = require('express');
const createTask = require('../controllers/tasks/createTask');
const fetchTasks = require('../controllers/tasks/fetchTasks');

const router = express.Router();

router.post('/', createTask);
router.get('/', fetchTasks);

module.exports = router;