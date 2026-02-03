#  ToDo Application – Backend (REST API)

This is a **backend-only ToDo (Task Management) application** built using **Node.js and Express**, following **MVC architecture**, **Clean Code principles**, and **Object-Oriented Programming (OOP)** concepts.

The application exposes a **RESTful API** that allows clients to create, read, update, filter, and delete tasks. No database is used — all data is stored **in-memory**, focusing purely on backend design and API flow.

---

##  Features

* RESTful API design
* MVC (Model–View–Controller) architecture
* Clean separation of concerns
* In-memory data storage (no database)
* Proper HTTP status codes
* Validation using middleware

---

##  Architecture Overview

```
Client
  ↓
Routes
  ↓
Middleware (Validation)
  ↓
Controllers (HTTP handling)
  ↓
Services (Business Logic)
  ↓
Models (Data Structure)
```

Each layer has **one responsibility**, making the application easy to understand, test, and extend.

---

##  Folder Structure

```
src/
 ├── controllers/
 │    └── task.controller.js
 ├── services/
 │    └── task.service.js
 ├── models/
 │    └── task.model.js
 ├── routes/
 │    └── task.routes.js
 ├── middlewares/
 │    └── validateTask.middleware.js
 ├── utils/
 │    └── uuid.js
 ├── app.js
 └── server.js
```

---

##  Tech Stack

* **Node.js**
* **Express.js**
* **Nodemon** (for development)
* **Crypto (UUID generation)**

---

##  Setup & Run

###  Install dependencies

```bash
npm install
```

###  Run the server

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

Server runs on:

```
http://localhost:3000
```

---
