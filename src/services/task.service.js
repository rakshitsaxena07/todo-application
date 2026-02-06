const store = require('../data/store');
const crypto = require('crypto');
const Task = require('../models/task.model');

const createTask = (data) => {
  const { title, description, priority, status } = data;

  const isTaskExists = store.tasks.some(
    (task) => task.title.toLowerCase() === title.toLowerCase()
  );

  if (isTaskExists) {
    const err = new Error('Task with this title already exists');
    err.status = 400;
    throw err;
  }

  const task = new Task({
    id: crypto.randomUUID(),
    title,
    description,
    status,
    priority,
  });

  store.tasks.push(task);
  return task;
};

const getAllTask = (query) => {
  let allTasks = [...store.tasks];

  if (query.status) {
    allTasks = allTasks.filter(
      (task) => task.status.toLowerCase() === query.status.toLowerCase()
    );
  }

  if (query.priority) {
    allTasks = allTasks.filter(
      (task) => task.priority.toLowerCase() === query.priority.toLowerCase()
    );
  }

  return allTasks;
};

const updateTask = (id, data) => {
  const taskIndex = store.tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    const err = new Error('Task not found');
    err.status = 404;
    throw err;
  }

  const task = store.tasks[taskIndex];

  // Check duplicate title
  if (data.title !== undefined) {
    const normalizedTitle = data.title.toLowerCase();
    const isDuplicate = store.tasks.some(
      (t) => t.id !== id && t.title.toLowerCase() === normalizedTitle
    );
    if (isDuplicate) {
      const err = new Error('Task with this title already exists');
      err.status = 400;
      throw err;
    }
  }

  // Update allowed fields
  const allowedFields = ['title', 'description', 'status', 'priority'];
  allowedFields.forEach((field) => {
    if (data[field] !== undefined) {
      task[field] = data[field];
    }
  });

  task.updatedAt = new Date();

  return task;
};

module.exports = { createTask, getAllTask, updateTask };
