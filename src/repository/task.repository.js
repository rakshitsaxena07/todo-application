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


module.exports = {
  create,
  findAll,
  findById,
  findByTitle,
};
