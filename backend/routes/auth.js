// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { connectToDatabase } = require('../db/mongodb');
const { UserNew } = require('../models/user');

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your_secret_key';

// Sign-up route
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;  // Ensure these are correctly extracted

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Username, email and password are required' });
    }

    try {
        const db = await connectToDatabase();
        const usersCollection = db.collection('users');

        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const passwordHash = await bcrypt.hash(password, 10);  // Ensure `password` is defined
        const newUser = new UserNew(username, email, passwordHash);
        await usersCollection.insertOne(newUser);

        // Create a JWT token with userId
        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });

        // Send the token as an HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true, 
            secure: false, // Use 'secure' in production with HTTPS // Change to true when in production
            sameSite: 'lax' // Needed if frontend and backend are on different origins
          });
        
        res.status(201).json({ message: 'User registered successfully', userName: username });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
        console.log(error);
    }
});

// Sign-in route
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const db = await connectToDatabase();
        const usersCollection = db.collection('users');

        // Find the user by username
        const user = await usersCollection.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Email not FOUND' });
        }

        // Compare the password with the hashed password
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });
        // Send the token as an HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true, 
            secure: false, // Use 'secure' in production with HTTPS // Change to true when in production
            sameSite: 'lax' // Needed if frontend and backend are on different origins
        });

        res.json({ message: 'Sign-in successful', token, userName: user.username });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
        console.log(error);
    }
});

module.exports = router;
