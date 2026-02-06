const { STATUS } = require('../../constants/taskConstants');
const store = require('../data/store');
const crypto = require('crypto');
const Task = require('../models/task.model');

const createTask = (data) => {
    const { title, description, priority,status } = data;
    const isTaskExists = store.tasks.find((task) => task.title.toLowerCase() === title.toLowerCase());
    if (isTaskExists) {
        throw new Error("Task with this title already exists");
    }

    const now = new Date();
    const task = new Task({
        id: crypto.randomUUID(),
        title: title,
        description: description,
        status: status,
        priority: priority,
        createdAt: now,
        updatedAt: now,
    });

    store.tasks.push(task);
    return task;
}
const getAllTask = (query) => {
    const allTasks = [...store.tasks]

    if (query.status) {
        allTasks = allTasks.filter(task => task.status.toLowerCase() === query.status.toLowerCase());
    }
    if (query.priority) {
        allTasks = allTasks.filter(task => task.priority.toLowerCase() === query.priority.toLowerCase());
    }
    if(allTasks.length===0){
      return []
    }
    return allTasks;
}
const updateTask = (id, data) => {

    const taskIndex = store.tasks.findIndex(task => task.id === id);
    if (taskIndex==-1) {
        throw new Error("Task not found");
    }
    if (data.title !== undefined) {
    const normalizedTitle = data.title.toLowerCase();
    const isDuplicate = store.tasks.some(
        (t) => t.id !== id && t.title.toLowerCase() === normalizedTitle
    );
    if (isDuplicate) {
        throw new Error("Task with this title already exists");
    }
  }

    const allowedFields = ['title', 'description', 'status', 'priority'];
    const updatedTask = {};

    allowedFields.forEach(field => {
        if (data[field] !== undefined) {
            updatedTask[field] = data[field];
        }
    });
    store.tasks[taskIndex]=updatedTask;

    return updatedTask;
};
module.exports = {
    createTask,getAllTask,updateTask
};