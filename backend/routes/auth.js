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
    const { firstname, lastname, username, email, password } = req.body; // Extract data from request body

    // Validating required fields
    if ( !firstname || !lastname || !username || !email || !password) {
        return res.status(400).json({ message: 'Firstname, Lastname, Username, email, and password are required' });
    }

    try {
        const db = await connectToDatabase();
        const usersCollection = db.collection('users');

        // Checks if the email already exists in the database
        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password for secure storage
        const passwordHash = await bcrypt.hash(password, 10);

        // Creates a new instance of UserNew with the provided data
        const newUser = new UserNew(firstname, lastname, username, email, passwordHash);

        // Inserts the new user instance into the database
        const result = await usersCollection.insertOne(newUser);

        // Uses result.insertedId to get the newly inserted user's ID
        const token = jwt.sign({ userId: result.insertedId }, SECRET_KEY, { expiresIn: '3d' });

        // Sets the token in a cookie, httpOnly for security
        res.cookie('token', token, {
            httpOnly: true, 
            secure: true, // Change to true when in production over HTTPS
            sameSite: 'lax', // Needed for frontend/backend on different origins
        });

        // Responds with success message and username
        res.status(201).json({ message: 'User registered successfully', userName: username, token: token });
    } catch (error) {
        // Log and respond with internal server error
        res.status(500).json({ message: 'Internal server error. Check Network and Try Again.' });
    }
});


// Sign-in route
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const db = await connectToDatabase();
        const usersCollection = db.collection('users');

        // Finds the user by username
        const user = await usersCollection.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Email not FOUND' });
        }

        // Compares the password with the hashed password
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Password' });
        }

        // Generates a JWT token
        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '3d' });
        // Sends the token as an HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true, 
            secure: true, // Use 'secure' in production with HTTPS // Change to true when in production
            sameSite: 'lax' // Needed if frontend and backend are on different origins
        });

        res.json({ message: 'Sign-in successful', token, userName: user.username });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error. Check Network and Try Again.' });
    }
});

module.exports = router;
