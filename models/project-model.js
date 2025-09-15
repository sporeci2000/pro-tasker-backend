const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Project name is required'],
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId, // reference to a User
            ref: 'User',
            required: true,
        },
        collaborators: [
            {
                type: mongoose.Schema.Types.ObjectId, // Array of User IDs
                ref: 'User',
            },
        ],
    },
    { timestamps: true } // adds createdAt and updatedAt automatically
);

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
