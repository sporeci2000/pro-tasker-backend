const Project = require('../models/project-model');

// Create a new project
async function createProject(req, res) {
    try {
        const project = await Project.create({
            name: req.body.name,
            description: req.body.description,
            owner: req.user.id, // logged-in user is owner
        });
        res.status(201).json({ success: 'Project created', project });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
}

// Get all projects for logged-in user
async function getProjects(req, res) {
    try {
        const projects = await Project.find({ owner: req.user.id });
        res.status(200).json(projects);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
}

// Get single project by ID
async function getProjectById(req, res) {
    try {
        const project = await Project.findById(req.params.id);
        if (!project || project.owner.toString() !== req.user.id) {
            return res.status(404).json({ error: 'Project not found or unauthorized' });
        }
        res.status(200).json(project);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
}

// Update a project
async function updateProject(req, res) {
    try {
        const project = await Project.findById(req.params.id);
        if (!project || project.owner.toString() !== req.user.id) {
            return res.status(404).json({ error: 'Project not found or unauthorized' });
        }

        project.name = req.body.name || project.name;
        project.description = req.body.description || project.description;

        await project.save();
        res.status(200).json(project);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
}

// Delete a project
async function deleteProject(req, res) {
    try {
        const project = await Project.findById(req.params.id);
        if (!project || project.owner.toString() !== req.user.id) {
            return res.status(404).json({ error: 'Project not found or unauthorized' });
        }

        await project.deleteOne(); 
        res.status(200).json({ success: 'Project deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject,
};
