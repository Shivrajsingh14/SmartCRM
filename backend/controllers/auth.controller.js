const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');

// Generate JWT token for authenticated user
exports.generateToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
};

// Register new user with email and password
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ 
                message: 'User already exists with this email' 
            });
        }
        
        // Create new user
        const user = new User({
            name,
            email,
            password,
            picture: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D9488&color=fff`
        });
        
        await user.save();
        
        // Generate token
        const token = exports.generateToken(user);
        
        // Return user data without password
        const userData = {
            id: user._id,
            name: user.name,
            email: user.email,
            picture: user.picture,
            role: user.role,
            isEmailVerified: user.isEmailVerified
        };
        
        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: userData
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ 
            message: 'Registration failed', 
            error: error.message 
        });
    }
};

// Login user with email and password
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ 
                message: 'Invalid email or password' 
            });
        }
        
        // Check if user has a password (not just Google OAuth)
        if (!user.password) {
            return res.status(401).json({ 
                message: 'This account was created with Google. Please use Google Sign-in.' 
            });
        }
        
        // Verify password
        const isValidPassword = await user.isValidPassword(password);
        if (!isValidPassword) {
            return res.status(401).json({ 
                message: 'Invalid email or password' 
            });
        }
        
        // Generate token
        const token = exports.generateToken(user);
        
        // Return user data without password
        const userData = {
            id: user._id,
            name: user.name,
            email: user.email,
            picture: user.picture,
            role: user.role,
            isEmailVerified: user.isEmailVerified
        };
        
        res.status(200).json({
            message: 'Login successful',
            token,
            user: userData
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            message: 'Login failed', 
            error: error.message 
        });
    }
};

// Google OAuth callback handler
exports.googleCallback = async (req, res) => {
    try {
        // At this point, user is already authenticated via Google OAuth
        // and stored in req.user by Passport middleware
        
        if (!req.user) {
            console.error('Google auth callback: No user data available');
            return res.redirect(`${process.env.CLIENT_URL}/login?error=authentication_failed`);
        }
        
        // Generate JWT token for the authenticated user
        const token = exports.generateToken(req.user);
        
        // Redirect to frontend with token
        res.redirect(`${process.env.CLIENT_URL}/auth/success?token=${token}`);
    } catch (error) {
        console.error('Authentication failed:', error);
        res.redirect(`${process.env.CLIENT_URL}/login?error=authentication_failed`);
    }
};

// Get current user profile
exports.getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-__v');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.status(200).json({ user });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};