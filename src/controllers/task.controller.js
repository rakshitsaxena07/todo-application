const service = require("../services/task.service")

const createTask = async (req, res) => {
    try {
        const data = await req.body
        const task = await service.createTask(data);
        res.status(201).json(task);
    } catch (error) {
            res.status(400).json({
                "error": {
                    "code": "INVALID_TASK_DATA",
                    "message": error.message
                }
            })
    }
}
const getAllTask = async (req, res) => {
    try {
        const query = await req.query;
        const tasks = await service.getAllTask(query);
        res.status(200).json(tasks);
    } catch (error) {
            res.status(500).json({
                "error": {
                    "code": "INTERNAL_SERVER_ERROR",
                    "message": error.message
            }
        })
    }
}

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const task = await updateTask(id, data);
        res.status(200).json(task);
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || "Internal Server Error"
        });
    }
};

module.exports = {createTask,updateTask,getAllTask};