const pool = require('../config/db');

const findByTitle = async (title) => {
  const result = await pool.query(`select * from tasks where LOWER(title) = LOWER($1)`,[title]);
  return result.rows[0] || null;
};

const create = async (task) => {
  const result = await pool.query(
    `insert into tasks (id, title, description, status, priority, createdAt, updatedAt)
     values ($1, $2, $3, $4, $5, NOW(), NOW()) RETURNING *`,
    [task.id, task.title, task.description, task.status, task.priority]
  );
  return result.rows[0];
};

module.exports = {
  findByTitle,
  create,
};