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
## Feature
### **1. Create Task**
Allows users to create new tasks with validation
- **Endpoint** : POST /v1/tasks 
```json
{
  "title": "string (max 100)",
  "description": "string (max 500)",
  "status": "pending | in progress | completed",
  "priority": "low | medium | high"
}
```
- Validates title and description length using middleware
- Tasks are created with a default status as pending and priority as low
- Prevents saving a task if another task with the same title already exists
- `createdAt` and `updatedAt` are set automatically during task creation
- Prevents saving a task if another task with the same title already exists

### **2. List Tasks**
Allows users to get new tasks with or without filter
- Returns all tasks when no filters are provided.
- Supports filtering by task status and priority.

**Endpoint**
- GET /v1/tasks
- GET /v1/tasks?status=pending
- GET /v1/tasks?priority=high
- GET /v1/tasks?status=pending&priority=medium

### **3. Update Task**
Allows users to update their tasks partially (any combination of fields).
**Endpoint**
- Endpoint: PATCH /v1/tasks/:id
- Request body
```json
{
  "title": "string (max 100)",
  "description": "string (max 500)",
  "status": "pending | in progress | completed",
  "priority": "low | medium | high"
}
```
- Validates updated fields if provided.
- Updates updatedAt automatically.
### **4. Get a single task**
Allows users to get a single task using the task_id

**Endpoint** : GET /v1/tasks/{id} 
- Return all the deatils of the task.
- Returns a 404 Not Found status code if the task does not exist.



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
│   ├── controllers
│   │   ├── task.controller.js
│   │
│   ├── data/
│   │   └── store.js
│   ├── models/
│   │   └── task.model.js
│   │
│   ├── routes/
│   │   └── task.route.js
│   │
│   ├── services
│   │   ├── task.service.js
│   │
│   ├── validators/
│   │   └── taskValidator.js
|   |  └── task.schema.js
│   └── app.js
│   └── server.js
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
node src/server.js
```

5. The server will start on:
```
http://localhost:3000
```

---


