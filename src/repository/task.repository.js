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

module.exports = {
  create
};
