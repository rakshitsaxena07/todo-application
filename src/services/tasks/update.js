const store = require('../../data/store');
const { validateUpdateTask } = require('../../validators/taskValidator');

const update = (id, data) => {
    validateUpdateTask(data);

    const task = store.tasks.find(task => task.id === id);
    if (!task) {
        const error = new Error("Task not found");
        error.status = 404;
        error.code = "TASK_NOT_FOUND";
        throw error;
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

module.exports = update;
