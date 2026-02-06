const { STATUS } = require('../../constants/taskConstants');
const store = require('../data/store');
const crypto = require('crypto');

const createTask = (data) => {
    const { title, description, priority,status } = data;
    const isTaskExists = store.tasks.find((task) => task.title.toLowerCase() === title.toLowerCase());
    if (isTaskExists) {
        throw new Error("Task with this title already exists");
    }

    const now = new Date();
    const task = {
        id: crypto.randomUUID(),
        title: title,
        description: description,
        status: status,
        priority: priority,
        createdAt: now,
        updatedAt: now,
    };

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
const update = (id, data) => {

    const task = store.tasks.find(task => task.id === id);
    if (!task) {
        const error = new Error("Task not found");
        error.status = 404;
        error.code = "TASK_NOT_FOUND";
        throw error;
    }



     if (data.title !== undefined) {
    const normalizedTitle = data.title.toLowerCase();

    const isDuplicate = store.tasks.some(
        (t) => t.id !== id && t.title.toLowerCase() === normalizedTitle
    );

    if (isDuplicate) {
        const error = new Error("Task with this title already exists");
        error.status = 409;
        error.code = "DUPLICATE_TASK";
        throw error;
    }
}

    const allowedFields = ['title', 'description', 'status', 'priority'];
    const updates = {};

    allowedFields.forEach(field => {
        if (data[field] !== undefined) {
            updates[field] = data[field];
        }
    });


    Object.assign(task, updates, { updatedAt: new Date() });

    return task;
};
module.exports = {
    create,get,update
};