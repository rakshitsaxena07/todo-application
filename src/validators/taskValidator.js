const { createTaskSchema, updateTaskSchema, createBulkTaskSchema } = require('./task.schema')

function validateCreateTask(req, res, next) {
    if (req.body.status) req.body.status = req.body.status.toLowerCase();
    if (req.body.priority) req.body.priority = req.body.priority.toLowerCase();

    const result = createTaskSchema.safeParse(req.body);
    if (!result.success) {
        const error = result.error?.issues?.[0]?.message || "Invalid input";
        return res.status(400).json({
            error: {
                code: "INVALID_TASK_DATA",
                message: error
            }
        })
    }
    req.body = result.data;
    next();
}

function validateUpdateTask(req, res, next) {
    const fieldsNotRequired = ['id', 'createdAt', 'updatedAt'];
    for (const field of fieldsNotRequired) {
        if (req.body[field] !== undefined) {
            return res.status(400).json({
                error: {
                    code: 'INVALID_UPDATE_FIELDS',
                    message: 'id, createdAt, and updatedAt cannot be updated',
                },
            });
        }
    }
    if (req.body.status) req.body.status = req.body.status.toLowerCase();
    if (req.body.priority) req.body.priority = req.body.priority.toLowerCase();


    const result = updateTaskSchema.safeParse(req.body);
    if (!result.success) {
        const error = result.error?.issues?.[0]?.message || "Invalid input";
        return res.status(400).json({
            error: {
                code: 'INVALID_TASK_DATA',
                message: error,
            },
        });
    }
    req.body = result.data;
    next();
}

function validateCreateBulkTasks(req, res, next) {
    if (!Array.isArray(req.body)) {
        return res.status(400).json({
            error: {
                code: "INVALID_TASK_DATA",
                message: "Request body must be an array of tasks"
            }
        });
    }

    req.body = req.body.map(task => ({
        ...task,
        status: task.status?.toLowerCase(),
        priority: task.priority?.toLowerCase()
    }));

    const result = createBulkTaskSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            error: {
                code: "INVALID_TASK_DATA",
                message: result.error.issues[0].message
            }
        });
    }

    req.body = result.data;
    next();
}

module.exports = { validateCreateTask, validateUpdateTask, validateCreateBulkTasks }