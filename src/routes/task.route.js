// src/routes/task.route.js
const express = require('express');
const taskController = require("../controllers/task.controller");
const validateMiddleware = require("../validators/taskValidator")

const router = express.Router();

router.post('/',validateMiddleware.validateCreateTask, taskController.createTask);
router.get('/', taskController.getAllTask);
router.patch('/:id',validateMiddleware.validateUpdateTask, taskController.updateTask);
router.get('/:id',taskController.getTaskById)
router.delete('/:id', taskController.deleteTask)
module.exports = router;