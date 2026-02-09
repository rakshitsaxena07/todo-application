const crypto = require('crypto');
const store = require('../data/store');
const Task = require('../models/task.model');

const create = (data) => {
  const task = new Task({
    id: crypto.randomUUID(),
    ...data
  });

  store.tasks.push(task);
  return task;
};

const findAll = () => {
  return [...store.tasks];
};

const findById = (id) => {
  return store.tasks.find(task => task.id === id) || null;
};

const findByTitle = (title) => {
  return store.tasks.find(
    task => task.title.toLowerCase() === title.toLowerCase()
  ) || null;
};

const updateById = (id, updates) => {
  const index = store.tasks.findIndex(task => task.id === id);
  if (index === -1) return null;

  store.tasks[index] = {
    ...store.tasks[index],
    ...updates,
    updatedAt: new Date()
  };

  return store.tasks[index];
};

const deleteById = (id) => {
  const index = store.tasks.findIndex(task => task.id === id);
  if (index === -1) return false;

  store.tasks.splice(index, 1);
  return true;
};



module.exports = {
  create,
  findAll,
  findById,
  findByTitle,
  updateById,
  deleteById
};
