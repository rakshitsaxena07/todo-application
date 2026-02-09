const pool = require('./config/db')
async function createTasksTable() {
    try {
        await pool.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id UUID PRIMARY KEY,
        title VARCHAR(255) NOT NULL UNIQUE,
        description TEXT NOT NULL,
        status VARCHAR(50),
        priority VARCHAR(50),
        createdAt TIMESTAMP DEFAULT NOW(),
        updatedAt TIMESTAMP
      );
    `);
        console.log("Tasks table created successfully");
    } catch (err) {
        console.error("Error creating tasks table:", err);
    }
}

module.exports=createTasksTable;