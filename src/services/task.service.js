const taskRepository = require('../repository/task.repository');

const createTask = (data) => {
  const existingTask = taskRepository.findByTitle(data.title);

  if (existingTask) {
    throw new Error('Task with this title already exists');
  }

  return taskRepository.create(data);
};

const getAllTasks = (query) => {
  let tasks = taskRepository.findAll();

  if (query.status) {
    tasks = tasks.filter(
      task => task.status.toLowerCase() === query.status.toLowerCase()
    );
  }

  if (query.priority) {
    tasks = tasks.filter(
      task => task.priority.toLowerCase() === query.priority.toLowerCase()
    );
  }

  return tasks;
};

const getTaskById = (id) => {
  const task = taskRepository.findById(id);

  if (!task) {
    throw new Error(`Task with id: ${id} not found`);
  }

  return task;
};

const updateTask = (id, data) => {
  const task = taskRepository.findById(id);

  if (!task) {
    throw new Error('Task not found');
  }

  if (
    data.title &&
    data.title.toLowerCase() !== task.title.toLowerCase()
  ) {
    const duplicate = taskRepository.findByTitle(data.title);
    if (duplicate && duplicate.id !== id) {
      throw new Error('Task with this title already exists');
    }
  }

  return taskRepository.updateById(id, data);
};

const deleteTask = (id) => {
  const deleted = taskRepository.deleteById(id);

  if (!deleted) {
    throw new Error('Requested task to delete is not found');
  }
};

const createBulkTasks = (tasksData) => {
  const titles = tasksData.map(t => t.title.toLowerCase());

  if (new Set(titles).size !== titles.length) {
    throw new Error('Duplicate titles found in request');
  }

  for (const data of tasksData) {
    const exists = taskRepository.findByTitle(data.title);
    if (exists) {
      throw new Error(
        `Task with title '${data.title}' already exists`
      );
    }
  }

  return taskRepository.createMany(tasksData);
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  createBulkTasks
};
