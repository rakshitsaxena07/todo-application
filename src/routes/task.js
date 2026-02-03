const express = require('express');
const createTask = require('../controllers/tasks/createTask');

const router = express.Router();

router.post('/', createTask);

module.exports = router;