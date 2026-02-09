// src/app.js
const express = require('express');
const taskRoutes = require('./routes/task.route');
const createTasksTable = require('./migrate')
const app = express();
app.use(express.json());
createTasksTable()

app.use('/v1/tasks', taskRoutes);
app.use((req, res) => {
  res.status(404).json({
    error: 'Requested resource not found'
  });
});

module.exports = app;