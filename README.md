# Pro-Tasker Backend / MERN Capstone

This is the backend API for Pro-Tasker, a project and task management tool.
It is built with Node.js, Express, MongoDB, and JWT authentication.   
The backend provides secure user authentication, project management, and task management endpoints, forming the foundation of the full-stack MERN app.

## Features

### Authentication
User registration & login   
Secure password hashing with bcrypt   
JWT-based authentication

### Projects
Create, view, update, delete projects   
Ownership-based authorization

### Tasks
Nested under projects  
CRUD operations for tasks   
Supports task status, priority, and assignedTo

### Security
Protected routes with JWT middleware   
Ownership checks for sensitive actions

### Tech Stack
Backend: Node.js, Express   
Database: MongoDB (Mongoose ODM)   
Authentication: JWT, bcrypt   
Other: dotenv, nodemon, cors

### Installation & Setup

1. Clone the repo   
git clone    
cd pro-tasker-backend   

2. Install dependencies   
npm install

3. Create .env file   
PORT=3000   
MONGO_URI=your_mongodb_connection_string   
JWT_SECRET=your_secret_key   

4. Run the server   
npm run dev

## API Endpoints

### Auth Routes
POST	/api/auth/register   	Register new user	   
POST	/api/auth/login	        Login user	   
GET	    /api/auth/currentUser	Get logged-in user	   

### Project Routes
POST	 /api/projects	        Create new project	   
GET	     /api/projects	        Get all projects    
GET	     /api/projects/:id   	Get single project	   
PUT	     /api/projects/:id  	Update project	   
DELETE	 /api/projects/:id  	Delete project	   

### Task Routes (nested under projects)
POST	/api/projects/:projectId/tasks	        Create new task	   
GET	    /api/projects/:projectId/tasks	        Get all tasks	   
PUT	    /api/projects/:projectId/tasks/:taskId	Update task	   
DELETE	/api/projects/:projectId/tasks/:taskId	Delete task   