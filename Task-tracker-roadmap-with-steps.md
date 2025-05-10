## 🚀 Phase 1: Setup & Basic Functionality

### ✅ Task 1: Project Setup
Set up the foundation for your project structure and developer experience.

**Steps:**
1. Initialize a Git repository: `git init`
2. Create a frontend React app using [Vite](https://vitejs.dev/) or Create React App:
   - `npm create vite@latest client --template react-ts`
   - or `npx create-react-app client --template typescript`
3. Scaffold backend with NestJS CLI: `nest new server`
4. Create a root folder and move frontend to `/client` and backend to `/server`
5. Configure ESLint & Prettier in both apps:
   - Install packages: `eslint`, `prettier`, `eslint-config-prettier`, `eslint-plugin-prettier`
   - Add config files `.eslintrc`, `.prettierrc`, `.editorconfig`
6. Add VSCode workspace settings (optional)

### ✅ Task 2: Basic Task Tracker UI (React)
Build the initial user interface and manage task state locally.

**Steps:**
1. Create a `Task` component with props: title, description
2. Create a mock list of tasks and render it in the main component (`App.tsx`)
3. Create a form with two inputs and a submit button for title and description
4. Use local React state (`useState`) to store and update tasks
5. Implement a delete function using `filter` and pass it to each `Task` component

### ✅ Task 3: NestJS API - CRUD for Tasks
Create RESTful API endpoints for task management.

**Steps:**
1. Create a `Task` model or interface with: `id`, `title`, `description`, `status`
2. Use a service (`TasksService`) to manage an array or Map of tasks
3. Implement the following endpoints in a controller:
   - `GET /tasks` → return all tasks
   - `GET /tasks/:id` → return task by ID
   - `POST /tasks` → create a new task
   - `PUT /tasks/:id` → update an existing task
   - `DELETE /tasks/:id` → remove a task
4. Use DTOs (`CreateTaskDto`, `UpdateTaskDto`) for request validation (basic)

### ✅ Task 4: Connect React to NestJS
Wire up frontend to backend for data fetching.

**Steps:**
1. Use Axios or Fetch in React to call `http://localhost:3000/tasks`
2. Use `useEffect` to fetch tasks from backend on component mount
3. Create `addTask` and `deleteTask` handlers that call POST/DELETE endpoints
4. Replace local state with backend data

## 🧪 Phase 2: Persistence, Filtering & Validations

### ✅ Task 5: Use Database (PostgreSQL + TypeORM or Prisma)
Add persistent storage to the backend.

**Steps:**
1. Install PostgreSQL or run via Docker
2. Install TypeORM or Prisma in NestJS: `@nestjs/typeorm`, `typeorm`, `pg`
3. Create a `Task` entity
4. Configure database connection in `app.module.ts`
5. Replace in-memory store with real DB operations in the service layer

### ✅ Task 6: Input Validations
Ensure correctness of data.

**Steps:**
1. Use `class-validator` and `class-transformer` in DTOs
2. Add decorators like `@IsString()`, `@IsNotEmpty()` in your DTOs
3. Enable global validation pipe in `main.ts`: `app.useGlobalPipes(new ValidationPipe())`
4. On frontend, use HTML5 validation or libraries like `react-hook-form` or manual validation

### ✅ Task 7: Task Filtering & Status
Introduce task status and filtering options.

**Steps:**
1. Add `status` property to Task entity and DTOs (enum: `PENDING`, `COMPLETED`)
2. Add optional query param in `GET /tasks?status=completed`
3. Filter tasks in the service based on status
4. Add filter buttons in React to call filtered endpoints or filter client-side

## 🛡️ Phase 3: Authentication & Authorization

### ✅ Task 8: Auth Setup
Secure the backend and define user roles.

**Steps:**
1. Create `User` entity/model with `id`, `email`, `password`
2. Install JWT modules: `@nestjs/jwt`, `passport-jwt`, `bcrypt`
3. Implement registration:
   - Hash password with `bcrypt`
   - Store user in DB
4. Implement login:
   - Validate credentials
   - Return signed JWT
5. Use JWT guard to protect task endpoints

### ✅ Task 9: Frontend Auth Flow
Enable user login and protected access in the frontend.

**Steps:**
1. Create login and signup pages with forms
2. On successful login, store JWT in `localStorage`
3. Use Axios interceptors to send Authorization headers
4. Use React Router and restrict routes to authenticated users

## 💡 Phase 4: Advanced Features

### ✅ Task 10: Advanced UI Features
Enhance usability with additional task features.

**Steps:**
1. Update task form and entity to include `dueDate`, `priority`
2. Allow users to sort tasks by due date or priority
3. Install and implement drag-and-drop (e.g., `react-beautiful-dnd`)
4. Save new order to backend (optional)

### ✅ Task 11: NestJS Advanced Concepts
Apply deeper NestJS features for better structure.

**Steps:**
1. Use Guards for authorization logic
2. Use Interceptors for response transformation/logging
3. Use Pipes for input transformation and validation
4. Use ConfigModule to read `.env` for DB connection, JWT secret
5. Implement pagination with query params (`?page=1&limit=10`)

### ✅ Task 12: React Optimization
Improve performance and manage state more efficiently.

**Steps:**
1. Replace prop drilling with `useContext` or external state (optional)
2. Use `useReducer` for complex state logic
3. Wrap heavy components with `React.memo`
4. Use `useCallback` and `useMemo` where needed

## 📦 Phase 5: Deployment & Testing

### ✅ Task 13: Backend Deployment
Host the NestJS server online.

**Steps:**
1. Create Render or Railway account
2. Push code to GitHub
3. Connect and deploy backend
4. Set up environment variables (DB URL, JWT secret)

### ✅ Task 14: Frontend Deployment
Make your app accessible to users.

**Steps:**
1. Push React project to GitHub
2. Deploy via Vercel or Netlify
3. Configure build settings (`npm run build`)
4. Point frontend to use live backend API

### ✅ Task 15: Testing
Ensure reliability through automated tests.

**Steps:**
1. Write unit tests for NestJS services and controllers using Jest
2. Write React component tests using React Testing Library
3. Write E2E tests using Cypress or Playwright (optional)

## 🎯 Optional Tasks

### 🌙 Dark Mode
- Add a toggle using CSS variables or Tailwind themes
- Store theme preference in localStorage

### 👤 User Profile Settings
- Add profile page
- Let user update email and password
- Use PATCH endpoint in backend

### 💬 Task Comments or Labels
- Add `Comment` or `Label` entities
- Link them to tasks via relations (one-to-many)
- Allow users to tag and comment