// app.js
require('dotenv').config();
const express = require('express');
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Use CORS middleware to allow requests from specific origins
const allowedOrigins = ['http://localhost:5173', 'https://2kh17n9g-5173.uks1.devtunnels.ms/'];

app.use(cors({
  origin: allowedOrigins, // List of allowed origins
  credentials: true
}));


// Middleware to parse cookies
app.use(cookieParser());

// Use the routes
app.use('/main', indexRoutes);
app.use('/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
