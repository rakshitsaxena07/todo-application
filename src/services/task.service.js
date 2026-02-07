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
    ...data
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
  const taskIndex = store.tasks.findIndex(task => task.id === id);
  if (taskIndex === -1) {
    throw new Error('Task not found');
  }
  const task = store.tasks[taskIndex];
  const allowedFields = ['title', 'description', 'status', 'priority'];
  const hasRealChange = allowedFields.some(field => {
    return (
      data[field] !== task[field]
    );
  });
  if (!hasRealChange) {
    return task;
  }

  if (data.title.toLowerCase() !== task.title.toLowerCase()) {
    const normalizedTitle = data.title.toLowerCase();
    const isDuplicate = store.tasks.some(
      t => t.id !== id && t.title.toLowerCase() === normalizedTitle
    );
    if (isDuplicate) {
      throw new Error('Task with this title already exists');
    }
  }
  allowedFields.forEach(field => {
    if (data[field] !== undefined) {
      task[field] = data[field];
    }
  });
  task.updatedAt = new Date();
  return task;
};

const getTaskById=(id)=>{
  const task = store.tasks.find(task=> task.id === id);
  if(!task){
    throw new Error(`Task with id: ${id} not found`)
  }
  return task;
}

module.exports = { createTask, getAllTask, updateTask, getTaskById };
