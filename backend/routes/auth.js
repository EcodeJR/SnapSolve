// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { connectToDatabase } = require('../db/mongodb');
const { UserNew } = require('../models/user');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables from .env file
// Ensure that the environment variables are loaded
const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 attempts
    message: 'Too many login attempts, please try again later'
});


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
        const cookieOptions = {
            httpOnly: true, // Prevents client-side access to the cookie through JavaScript
            secure: process.env.NODE_ENV === 'production', // Only true in production
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
            maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days in milliseconds
            path: '/', // Cookie is available for all paths
            domain: process.env.NODE_ENV === 'production' 
                ? process.env.COOKIE_DOMAIN 
                : 'localhost'
        };

        // Update the cookie setting in both signin and signup routes
        res.cookie('token', token, cookieOptions);

        // Responds with success message and username
        res.status(201).json({ message: 'User registered successfully', userName: username, token: token });
    } catch (error) {
        // Log and respond with internal server error
        res.status(500).json({ message: 'Internal server error. Check Network and Try Again.' });
        console.log("Sign Up Error:", error);
    }
});


// Sign-in route
router.post('/signin', authLimiter, async (req, res) => {
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
        const cookieOptions = {
            httpOnly: true, // Prevents client-side access to the cookie through JavaScript
            secure: process.env.NODE_ENV === 'production', // Only true in production
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
            maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days in milliseconds
            path: '/', // Cookie is available for all paths
            domain: process.env.NODE_ENV === 'production' 
                ? process.env.COOKIE_DOMAIN 
                : 'localhost'
        };

        // Update the cookie setting in both signin and signup routes
        res.cookie('token', token, cookieOptions);

        res.json({ message: 'Sign-in successful', token, userName: user.username });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error. Check Network and Try Again.' });
        console.log("Sign In Error:", error);
    }
});

// Request password reset
router.post('/forgot-password', authLimiter, async (req, res) => {
    const { email } = req.body;

    try {
        const db = await connectToDatabase();
        const usersCollection = db.collection('users');
        const user = await usersCollection.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'Email not found' });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = Date.now() + 3600000; // 1 hour

        // Store reset token in database
        await usersCollection.updateOne(
            { email },
            { 
                $set: { 
                    resetToken,
                    resetTokenExpiry 
                } 
            }
        );

        // Send email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Construct reset URL
        const urlToreset = process.env.NODE_ENV === 'production' 
            ? process.env.FRONTEND_URL_PROD
            : process.env.FRONTEND_URL_DEV;

        const resetUrl = `${urlToreset}/reset-password/${resetToken}`;

        // const { imageToBase64 } = require('../scripts/imageToBase64');
        // const logoBase64 = imageToBase64();
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset Request',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="text-align: center; padding: 20px;">
                        <h2 style="color: #111827; margin-bottom: 14px;">SnapSolve</h2>
                    </div>
                    <div style="padding: 20px; background-color: #f9fafb; border-radius: 8px;">
                        <h1 style="color: #111827; margin-bottom: 16px;">Password Reset Request</h1>
                        <p style="color: #4b5563; margin-bottom: 16px;">We received a request to reset your password. If you did not make this request, please ignore this email.</p>
                        <p style="color: #4b5563; margin-bottom: 24px;">Click the button below to reset your password. This link will expire in 1 hour.</p>
                        <div style="text-align: center;">
                            <a href="${resetUrl}" 
                            style="display: inline-block; padding: 12px 24px; background-color: #3b82f6; 
                                    color: white; text-decoration: none; border-radius: 6px; 
                                    font-weight: 500;">Reset Password</a>
                        </div>
                        <p style="color: #6b7280; margin-top: 24px; font-size: 14px;">
                            If the button doesn't work, copy and paste this link into your browser:<br>
                            <a href="${resetUrl}" style="color: #3b82f6; word-break: break-all;">${resetUrl}</a>
                        </p>
                    </div>
                    <div style="text-align: center; padding: 20px;">
                        <p style="color: #6b7280; font-size: 14px;">
                            © ${new Date().getFullYear()} SnapSolve. All rights reserved.
                        </p>
                    </div>
                </div>
            `
        });
                res.json({ message: 'Password reset link sent to email' });
            } catch (error) {
                console.error('Forgot password error:', error);
                res.status(500).json({ message: 'Error processing request. Try again!' });
            }
});

// Reset password
router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        const db = await connectToDatabase();
        const usersCollection = db.collection('users');

        const user = await usersCollection.findOne({
            resetToken: token,
            resetTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired reset token' });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        await usersCollection.updateOne(
            { _id: user._id },
            {
                $set: { passwordHash },
                $unset: { resetToken: "", resetTokenExpiry: "" }
            }
        );

        res.json({ message: 'Password successfully reset' });
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ message: 'Error resetting password' });
    }
});

module.exports = router;
