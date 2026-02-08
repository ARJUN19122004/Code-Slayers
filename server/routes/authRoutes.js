const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// POST /signup
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password, domain, level } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({
            name,
            email,
            password: hashedPassword,
            domain,
            level
        });

        await user.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Signup error:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// POST /login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Return token and user (without password)
        const userResponse = {
            _id: user._id,
            name: user.name,
            email: user.email,
            domain: user.domain,
            level: user.level,
            createdAt: user.createdAt
        };

        res.json({ token, user: userResponse });
    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
