const express = require('express');
const verifyAuthentication = require('../middleware/auth-middleware');
const {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject,
} = require('../controllers/project-controller');

const taskRoutes = require('./task-routes');
router.use('/:projectId/tasks', taskRoutes);

const router = express.Router();

// All project routes require authentication
router.use(verifyAuthentication);

// Create a new project
// POST /api/projects
router.post('/', createProject);

// Get all projects for the logged-in user
// GET /api/projects
router.get('/', getProjects);

// Get a single project by ID
// GET /api/projects/:id
router.get('/:id', getProjectById);

// Update a project
// PUT /api/projects/:id
router.put('/:id', updateProject);

// Delete a project
// DELETE /api/projects/:id
router.delete('/:id', deleteProject);

module.exports = router;
