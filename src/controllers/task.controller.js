const service = require('../services/task.service');

const createTask = async (req, res) => {
  try {
    const data = req.body;
    const task = await service.createTask(data);

    return res.status(201).json(task);
  } catch (error) {
    return res.status(error.status || 400).json({
      error: {
        code: 'INVALID_TASK_DATA',
        message: error.message,
      },
    });
  }
};

const getAllTask = async (req, res) => {
  try {
    const query = req.query;
    const tasks = await service.getAllTask(query);

    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(error.status || 500).json({
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: error.message,
      },
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const task = await service.updateTask(id, data);

    return res.status(200).json(task);
  } catch (error) {
    return res.status(error.status || 404).json({
      error: {
        code: 'TASK_NOT_FOUND',
        message: error.message,
      },
    });
  }
};

module.exports = { createTask, getAllTask, updateTask };
