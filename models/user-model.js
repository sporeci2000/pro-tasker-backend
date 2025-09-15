// Import mongoose library
const mongoose = require('mongoose');

// Import bcrypt library to hash and compare passwords
const bcrypt = require('bcrypt');

// Define the shape of a User document in MongoDB
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            trim: true,
            required: true,
        },

        email: {
            type: String,
            required: [true, 'Email is required.'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/.+@.+\..+/, 'Must match an email address!'],
        },

        password: {
            type: String,
            required: true,
            minlength: [8, 'Password must be at least 8 characters long.'],
        },
    },
    { timestamps: true } // CreatedAt and updatedAt timestamps
);

// Middleware: hash password if new/modified
// That runs BEFORE saving a user to the database
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

// Compare entered password with stored hash
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

// Compile the schema into a model so it can be used in controllers
const User = mongoose.model('User', userSchema);

// Export the User model for use in routes/controllers
module.exports = User;