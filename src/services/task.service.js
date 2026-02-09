const store = require('../data/store');
const crypto = require('crypto');
const Task = require('../models/task.model');
const repository = require('../repository/task.repository')
const createTask =async (data) => {
  const { title } = data;

  const existingTask =await repository.findByTitle(title);

  if (existingTask) {
    throw new Error('Task with this title already exists');
  }

  const task = {
    id: crypto.randomUUID(),
    ...data
  };

  return await repository.create(task);
};

const getAllTask =async(query) => {
  let allTasks = await repository.getAllTasks();

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

const deleteTask=(id)=>{
  const numberOfTasks=store.tasks.length
  store.tasks=store.tasks.filter(task=>task.id!==id);
  if(store.tasks.length===numberOfTasks){
    throw new Error("Requested task to delete is not found")
  }
}

const createBulkTasks = (tasksData) => {

  const titles = tasksData.map(t => t.title.toLowerCase());

  const hasDuplicateInRequest = new Set(titles).size !== titles.length;

  if (hasDuplicateInRequest) {
    throw new Error('Duplicate titles found in request');
  }
  for (const data of tasksData) {
    const isTaskExists = store.tasks.some(
      task => task.title.toLowerCase() === data.title.toLowerCase()
    );

    if (isTaskExists) {
      throw new Error(
        `Task with title '${data.title}' already exists`
      );
    }
  }
  const createdTasks = [];
  for (const data of tasksData) {
    const task = new Task({
      id: crypto.randomUUID(),
      ...data
    });
    store.tasks.push(task);
    createdTasks.push(task);
  }
  return createdTasks;
};


module.exports = { createTask, getAllTask, updateTask, getTaskById, deleteTask, createBulkTasks };
