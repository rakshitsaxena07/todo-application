// src/app.js
const express = require('express');
const taskRoutes = require('./routes/task.route');

const app = express();
app.use(express.json());

app.use('/v1/tasks', taskRoutes);
app.use('/*', (req, res) => {
    res.status(404).send('Not Found');
});

module.exports = app;