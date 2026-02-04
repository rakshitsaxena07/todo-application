const { PRIORITY } = require("../constants/taskConstants");

const validateCreateTask = (data) => {
     const { title, description, priority } = data;  //changed besause .trim() will give error when no title

    if (!title || typeof title !== 'string' || title.length > 100) {
        const error = new Error("Invalid or missing 'title'");
        error.status = 400;
        error.code = "INVALID_TITLE";
        throw error;
    }

    if (!description || typeof description !== 'string' || description.length > 500) {
        const error = new Error("Invalid or missing 'description'");
        error.status = 400;
        error.code = "INVALID_DESCRIPTION";
        throw error;
    }

    if (!priority || !Object.values(PRIORITY).includes(priority)) {
        const error = new Error("Invalid or missing 'priority'");
        error.status = 400;
        error.code = "INVALID_PRIORITY";
        throw error;
    }
}

module.exports = validateCreateTask;