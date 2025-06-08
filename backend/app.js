require('dotenv').config();
const express = require('express');
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Dynamically set allowed origins based on environment
const allowedOrigins = [
    process.env.FRONTEND_URL_DEV,
    process.env.FRONTEND_URL_PROD,
    'https://snap-solve-ecodejr-fc5upq1vd-ecodejrs-projects.vercel.app'
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));


// Middleware to parse cookies
app.use(cookieParser());

// Using the routes
app.use('/main', indexRoutes);
app.use('/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
