const create = require('../../services/tasks/create');

const createTask = async (req, res) => {
    try {
        const data = await req.body
        const task = await create(data);
        res.status(201).json(task);
    } catch (error) {
        return res.status(error.status || 500).json({
            message: error.message || "Internal Server Error"
        });
    }
}

module.exports = createTask;