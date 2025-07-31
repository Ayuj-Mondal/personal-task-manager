# Personal Task Manager 🗂️ (MEAN Stack)

A full-stack personal task manager application built using the MEAN stack (MongoDB, Express, Angular, Node.js). Users can log in, create tasks, assign deadlines and priorities, and mark them as complete or delete them.

---

## ✨ Features

- 🔐 User Authentication (Login/Register)
- 📝 Create, Read, Update, Delete tasks
- 📅 Task deadlines
- ⭐ Priority levels
- ✅ Mark tasks as complete
- 🗑️ Delete tasks
- 🧼 Clean, responsive UI

---

## 🧰 Tech Stack

| Layer      | Technology            |
|------------|------------------------|
| Frontend   | Angular                |
| Backend    | Node.js + Express.js   |
| Database   | MongoDB (Mongoose ORM) |
| Auth       | JSON Web Tokens (JWT)  |
| Styling    | CSS / SCSS             |

---

## 🖥️ Local Setup (Run Frontend & Backend Concurrently)

> ⚠️ Make sure you have **Node.js**, **Angular CLI**, and **MongoDB** installed

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/personal-task-manager.git
cd personal-task-manager

### 2. Setup Backend

cd backend
npm install

### ➕ Create .env in /backend

PORT=4000
JWT_SECRET=your_jwt_secret
MONGODB_URI=mongodb://localhost:27017/taskmanager
CORS_ORIGIN=http://localhost:4200

### 3. Setup Frontend

cd ../frontend
npm install

### 4. Run Both Frontend and Backend Concurrently
###    Install concurrently in the root:

cd ..
npm install concurrently --save-dev

### Add to root package.json:

```json
"scripts": {
  "start": "concurrently \"npm run server\" \"npm run client\"",
  "server": "cd backend && npm start",
  "client": "cd frontend && ng serve"
}
```

# Then run
npm start