# 🛠️ DevTasks – Developer Task Manager

A progressive project to build a full-featured task management app, learning modern full-stack development with **React** and **NestJS** (with PostgreSQL). Inspired by Trello/Asana but simplified.

---

## ✅ Level 1 – Basic Task Tracker (Frontend Only)

**🎯 Goal:** Learn React basics.

### 🔹 Features:
- List tasks
- Add new task
- Mark task as done
- Delete task

### 📘 What You’ll Learn:
- Functional components
- JSX rendering
- Component props
- `useState`, `useEffect`
- Local state management

---

## ✅ Level 2 – Backend with NestJS + PostgreSQL

**🎯 Goal:** Persist data using a backend API.

### 🔹 Features:
- Full CRUD API for tasks (`/tasks`)
- Store data in PostgreSQL
- Fetch tasks from backend in React

### 📘 What You’ll Learn:
- NestJS architecture (modules, controllers, services)
- REST API using NestJS decorators (`@Get`, `@Post`, etc.)
- PostgreSQL integration using **TypeORM** or **Prisma**
- Entity creation and relationships
- Connect React frontend to backend using `axios`

---

## ✅ Level 3 – User Authentication

**🎯 Goal:** Secure app with user accounts and auth.

### 🔹 Features:
- Register/login endpoints (`/auth`)
- Store and verify JWT tokens
- Fetch tasks per authenticated user

### 📘 What You’ll Learn:
- User authentication with NestJS
- JWT and `@nestjs/passport`
- Password hashing with `bcrypt`
- Auth guards and middleware in NestJS
- React form handling and validation
- Protected routes using React Router + JWT

---

## ✅ Level 4 – Advanced Features

**🎯 Goal:** Add usability and productivity enhancements.

### 🔹 Features:
- Task labels (bug, feature, urgent)
- Due dates
- Sorting and filtering
- Dark mode toggle

### 📘 What You’ll Learn:
- Custom React hooks (e.g. `useTasks`)
- Context API or Redux for global state
- Filtering & sorting in backend queries
- Theme management (CSS variables or class toggles)
- Entity relations in PostgreSQL (e.g., task ↔ labels)

---

## ✅ Level 5 – Collaboration + Deployment

**🎯 Goal:** Build a production-ready, multi-user application.

### 🔹 Features:
- Task groups (like project boards)
- Invite users to groups by email
- Role-based access (admin, member)
- Real-time updates (Socket.io – optional)
- Deploy frontend (Vercel/Netlify)
- Deploy backend (Render/Railway)
- Use PostgreSQL in production (e.g., via Supabase or Neon)

### 📘 What You’ll Learn:
- Role-based auth with custom NestJS decorators
- Sending email invites via `nodemailer` + NestJS mailer
- Real-time updates with `@nestjs/websockets` (optional)
- Deployment steps for full-stack apps
- Managing `.env` variables
- Production PostgreSQL setup

---

## 🧰 Tech Stack

- **Frontend:** React, Context API / Redux, Axios, TailwindCSS (optional)
- **Backend:** NestJS, PostgreSQL, TypeORM or Prisma
- **Auth:** Passport + JWT
- **Real-Time:** Socket.io (optional)
- **Deployment:** Vercel (frontend), Render/Railway (backend), PostgreSQL (Neon/Supabase)

---

## 🚀 Next Steps

You can build this progressively level-by-level. Keep commits clean, write modular code, and use `.env` for environment configs.

