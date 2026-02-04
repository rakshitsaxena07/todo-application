const store = require('../../data/store');

const fetch = (query) => {
    const allTasks = [...store.tasks]

    if (query.status) {
        return allTasks.filter(task => task.status.toLowerCase() === query.status.toLowerCase());
    }

    if (query.priority) {
        return allTasks.filter(task => task.priority.toLowerCase() === query.priority.toLowerCase());
    }

    return allTasks;
}

module.exports = fetch;