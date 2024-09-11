// app.js
require('dotenv').config();
const express = require('express');
const app = express();
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const cors = require('cors');

// Middleware to parse JSON bodies
app.use(express.json());

// Use CORS middleware to allow requests from specific origins
app.use(cors({
    origin: 'http://localhost:5173' // Frontend origin
  }));

// Use the routes
app.use('/main', indexRoutes);
app.use('/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
