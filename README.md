# Todo Application

## Problem Statement
Design and implement a robust RESTful API for a Task Management System. The application must be built using the Model-View-Controller (MVC) architectural pattern, where the "View" is represented by JSON responses, No Database. The primary goal is to demonstrate mastery of Object-Oriented Programming (OOP) and Clean Architecture.

#### Each task should have:
- A unique identifier (UUID).
- A title (required, max 100 chars).
- A description (required, max 500 chars).
- A status (Pending, In Progress, Completed).
- A priority level (Low, Medium, High).
- Timestamps (Created At, Updated At).

#### The Backend App must support:
- Create Task: Validate input and prevent duplicate titles.
- List All Tasks: Filterable by status or priority.
- Get Single Task: Retrieve details by ID; handle "Not Found" scenarios gracefully.
- Update Task: Partially update fields (e.g., just changing the status).
- Delete Task: Remove a task and return an appropriate status code.

---

## Tech Stack

- Node.js
- Express.js
- JavaScript (CommonJS)
- UUID for unique identifiers
- In-memory data storage (No Database)

---
## Features

### 1. Create Task
- Accepts task details via request body
- Validates task input(title, description and priority)
- Prevents duplicate task titles
- Automatically generates UUID and timestamps

### 2. List All Tasks
- Returns all tasks
- Supports filtering by:
  - Status->[Pending, In Progress, Completed]
  - Priority->[High, Medium, Low]

### 3. Update Task
- update or alter existing task - title, description
- update Status
- update Priority

---

## 📂 Project Structure

```txt
todo-application/
│
├── node_modules/
│
├── src/
│   │
│   ├── constants/
│   │   └── taskConstants.js
│   │
│   ├── controllers/tasks/
│   │   ├── createTask.js
│   │   ├── fetchTasks.js
│   │   └── updateTask.js
│   │
│   ├── data/
│   │   └── store.js
│   │
│   ├── routes/
│   │   └── task.js
│   │
│   ├── services/tasks/
│   │   ├── create.js
│   │   ├── fetch.js
│   │   └── update.js
│   │
│   ├── validators/
│   │   └── taskValidator.js
│   │
│   └── app.js
│
├── .gitignore
├── index.js
├── package-lock.json
├── package.json
└── README.md
```
---

## Installation & Setup
#### Prerequisites
- Node.js (v18+ recommended)
- npm

#### Steps

1. Clone the repository
```
git clone https://github.com/rakshitsaxena07/todo-application.git
```

2. Navigate to the project directory
```
cd todo-application
```

3. Install dependencies
```
npm install
```

4. Start the server
```
node index.js
```

5. The server will start on:
```
http://localhost:3000
```

---

## Testing the API

#### You can test the API using:

- Postman
- Thunder Client
- curl

All responses are returned in JSON format with appropriate HTTP status codes.

---

## Assumptions & Limitations

No database is used (data resets on server restart)

Authentication and authorization are out of scope

Designed purely for architectural and OOP demonstration
