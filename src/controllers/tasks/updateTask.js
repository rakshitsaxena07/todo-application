const update = require('../../services/tasks/update');

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const task = await update(id, data);
        res.status(200).json(task);
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || "Internal Server Error"
        });
    }
};

module.exports = updateTask;
