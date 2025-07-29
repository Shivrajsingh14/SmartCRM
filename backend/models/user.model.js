const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: function() {
            return !this.googleId; // Password required only if not using Google OAuth
        }
    },
    googleId: {
        type: String,
        sparse: true
    },
    picture: {
        type: String
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    isEmailVerified: {
        type: Boolean,
        default: function() {
            return !!this.googleId; // Google OAuth users are automatically verified
        }
    }
}, {
    timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password') || !this.password) return next();
    
    try {
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to check if a password matches the user's password
userSchema.methods.isValidPassword = async function(password) {
    if (!this.password) return false;
    const compare = await bcrypt.compare(password, this.password);
    return compare;
};

const User = mongoose.model('User', userSchema);

module.exports = User;