const fetch = require('../../services/tasks/fetch');

const fetchTasks = async (req, res) => {
    try {
        const query = await req.query;
        const tasks = await fetch(query);
        res.status(200).json(tasks);
    } catch (error) {
        return res.status(error.status || 500).json({
            message: error.message || "Internal Server Error"
        });
    }
}

module.exports = fetchTasks;