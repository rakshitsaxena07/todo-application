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

    //To check duplicate title while updating

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

module.exports = update;
