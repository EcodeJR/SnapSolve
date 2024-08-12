// app.js
require('dotenv').config();
const express = require('express');
const app = express();
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');

// Middleware to parse JSON bodies
app.use(express.json());

// Use the routes
app.use('/', indexRoutes);
app.use('/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
