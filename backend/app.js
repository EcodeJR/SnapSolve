require('dotenv').config();
const express = require('express');
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Using CORS middleware to allow requests from specific origins
const allowedOrigins = [
  'http://localhost:5173',
  'https://snap-solve-ecodejr.vercel.app',
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin, like mobile apps or Postman
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
