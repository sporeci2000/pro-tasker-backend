const express = require('express');
const verifyAuthentication = require('../middleware/auth-middleware');
const {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
} = require('../controllers/task-controller');


const router = express.Router({ mergeParams: true });

// All task routes require authentication
router.use(verifyAuthentication);

// Routes
router.post('/', createTask);            // Create task
router.get('/', getTasks);               // Get all tasks in a project
router.put('/:taskId', updateTask);      // Update a task
router.delete('/:taskId', deleteTask);   // Delete a task

module.exports = router;
