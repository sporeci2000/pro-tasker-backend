const Task = require('../models/task-model');
const Project = require('../models/project-model');

async function createTask(req, res) {
    try {
        const { title, description, status, priority, assignedTo } = req.body;

        // Check if project exists
        const project = await Project.findById(req.params.projectId);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        // Only owner of the project can add tasks
        if (project.owner.toString() !== req.user.id) {
            return res.status(401).json({ error: 'Not authorized' });
        }

        const task = await Task.create({
            title,
            description,
            status,
            priority,
            assignedTo,
            project: req.params.projectId,
        });

        res.status(201).json({ success: 'Task created', task });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
}

async function getTasks(req, res) {
    try {
        const project = await Project.findById(req.params.projectId);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        // Only owner can view tasks
        if (project.owner.toString() !== req.user.id) {
            return res.status(401).json({ error: 'Not authorized' });
        }

        const tasks = await Task.find({ project: req.params.projectId });
        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
}

async function updateTask(req, res) {
    try {
        const project = await Project.findById(req.params.projectId);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        if (project.owner.toString() !== req.user.id) {
            return res.status(401).json({ error: 'Not authorized' });
        }

        let task = await Task.findById(req.params.taskId);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        // Update fields
        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;
        task.status = req.body.status || task.status;
        task.priority = req.body.priority || task.priority;
        task.assignedTo = req.body.assignedTo || task.assignedTo;

        const updatedTask = await task.save();
        res.status(200).json(updatedTask);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
}

async function deleteTask(req, res) {
    try {
        const project = await Project.findById(req.params.projectId);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        if (project.owner.toString() !== req.user.id) {
            return res.status(401).json({ error: 'Not authorized' });
        }

        const task = await Task.findById(req.params.taskId);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        await task.deleteOne();
        res.status(200).json({ success: 'Task deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
};
