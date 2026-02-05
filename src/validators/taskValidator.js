const { PRIORITY, STATUS } = require("../constants/taskConstants");

const validateCreateTask = (data) => {
    const { title, description, status, priority } = data;
    
    if (!title || typeof title !== 'string' || title.trim().length === 0 || title.length > 100) {
        const error = new Error("Invalid or missing title");
        error.status = 400;
        error.code = "INVALID_TITLE";
        throw error;
    }

    if (!description || typeof description !== 'string' || description.trim().length === 0 || description.length > 500) {
        const error = new Error("Invalid or missing description");
        error.status = 400;
        error.code = "INVALID_DESCRIPTION";
        throw error;
    }
    
    if (!status || !Object.values(STATUS).includes(status)) {
        const error = new Error("Invalid or missing status");
        error.status = 400;
        error.code = "INVALID_STATUS";
        throw error;
    }
    
    if (!priority || !Object.values(PRIORITY).includes(priority)) {
        const error = new Error("Invalid or missing priority");
        error.status = 400;
        error.code = "INVALID_PRIORITY";
        throw error;
    }
};

const validateUpdateTask = (data) => {
    const validFields = ['title', 'description', 'status', 'priority'];
    const hasValidField = Object.keys(data).some(key => validFields.includes(key));
    
    if (!hasValidField) {
        const error = new Error("No valid fields to update");
        error.status = 400;
        error.code = "NO_VALID_FIELDS";
        throw error;
    }

    const { title, description, status, priority } = data;

    if (title !== undefined) {
        if (typeof title !== 'string' || title.trim().length === 0 || title.length > 100) {
            const error = new Error("Invalid title");
            error.status = 400;
            error.code = "INVALID_TITLE";
            throw error;
        }
    }

    if (description !== undefined) {
        if (typeof description !== 'string' || description.trim().length === 0 || description.length > 500) {
            const error = new Error("Invalid description");
            error.status = 400;
            error.code = "INVALID_DESCRIPTION";
            throw error;
        }
    }

    if (status !== undefined) {
        if (!Object.values(STATUS).includes(status)) {
            const error = new Error("Invalid status");
            error.status = 400;
            error.code = "INVALID_STATUS";
            throw error;
        }
    }

    if (priority !== undefined) {
        if (!Object.values(PRIORITY).includes(priority)) {
            const error = new Error("Invalid priority");
            error.status = 400;
            error.code = "INVALID_PRIORITY";
            throw error;
        }
    }
};

module.exports = { validateCreateTask, validateUpdateTask };