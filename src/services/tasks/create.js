const { STATUS } = require('../../constants/taskConstants');
const store = require('../../data/store');
const crypto = require('crypto');
const {validateCreateTask} = require('../../validators/taskValidator');

const create = (data) => {
    validateCreateTask(data);
    const { title, description, priority,status } = data;

    const isTaskExists = store.tasks.find((task) => task.title.toLowerCase() === title.toLowerCase());
    if (isTaskExists) {
        const error = new Error("Task with this title already exists");
        error.status = 409;
        error.code = "DUPLICATE_TASK";
        throw error;
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

module.exports = create;