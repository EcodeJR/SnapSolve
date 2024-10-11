// routes/index.js
require('dotenv').config();
const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('../db/mongodb');
const { TextPrompt, ImagePrompt } = require('../ai/snap_ai');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const jwt = require('jsonwebtoken'); // For verifying the JWT
const authenticate = require('../authenticate/authMiddleware');
const secretKey = process.env.JWT_SECRET_KEY || 'your_secret_key';

router.get('/', async (req, res) => {
    const db = await connectToDatabase();
    const collection = db.collection('Snapsolve'); // Replace 'myCollection' with your collection name
    
    const documents = await collection.find({}).toArray();
    res.json(documents);
});

router.post('/add', async (req, res) => {
    const db = await connectToDatabase();
    const collection = db.collection('Snapsolve');
    
    const result = await collection.insertOne({ name: req.body.name, type: req.body.type });
    res.json({ insertedId: result.insertedId });
});

// Apply middleware to the /chat route
router.post('/chat', authenticate, async (req, res) => {
    const userId = req.userId; // Extracted from middleware
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    try {
        // Save the user's message to the database
        const db = await connectToDatabase();
        const chatCollection = db.collection('Chat_History');
        let chat = await chatCollection.findOne({ userId });

        if (!chat) {
            chat = { userId, messages: [] };
        }

        // chat.messages.push({ sender: 'user', message, timestamp: new Date() });

        if (chat._id) {
            await chatCollection.updateOne(
                { _id: chat._id },
                { $set: { messages: chat.messages } }
            );
        } else {
            const result = await chatCollection.insertOne(chat);
            chat._id = result.insertedId;
        }

        // Call AI API
        const botResponse = await TextPrompt(message);

        // Save the bot's response to the database
        chat.messages.push({ message: message, botResponse: botResponse, timestamp: new Date() });
        await chatCollection.updateOne(
            { _id: chat._id },
            { $set: { messages: chat.messages } }
        );

        // Send the bot's response back to the user
        res.json({ botResponse: botResponse });
    } catch (error) {
        console.log('Error in /chat route:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Define a route to handle image uploads
router.post('/image', authenticate, upload.single('image'), async (req, res) => {
    const userId = req.userId; // Extracted from middleware
    const imageFile = req.file; // multer adds the uploaded file to req.file

    if (!imageFile) {
        return res.status(400).json({ error: 'No image file uploaded' });
    }

    try {
        // Connect to the database
        const db = await connectToDatabase();
        const chatCollection = db.collection('Chat_History');
        let chat = await chatCollection.findOne({ userId });

        if (!chat) {
            chat = { userId, messages: [] };
        }

         // Placeholder text for user's image submission
        // chat.messages.push({ sender: 'user', message: userMessage, timestamp: new Date() });

        // Save/update chat history in database
        if (chat._id) {
            await chatCollection.updateOne(
                { _id: chat._id },
                { $set: { messages: chat.messages } }
            );
        } else {
            const result = await chatCollection.insertOne(chat);
            chat._id = result.insertedId;
        }

        // Process the image using AI API
        const botResponse = await ImagePrompt(imageFile.path); // Assuming ImagePrompt accepts the image path

        // Save the user's image submission
        const userMessage = 'Image uploaded';
        // Save the bot's response to the database
        chat.messages.push({ message: userMessage, botResponse: botResponse, timestamp: new Date() });
        await chatCollection.updateOne(
            { _id: chat._id },
            { $set: { messages: chat.messages } }
        );

        // Send the bot's response back to the user
        res.json({ botResponse: botResponse });
    } catch (error) {
        console.log('Error processing /image route:', error);
        res.status(500).json({ error: 'Error processing image' });
    }
});


router.get('/chat-history', async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];

        // Check if the Authorization header is present and properly formatted
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized access, no token provided' });
        }

        // Extract the token (remove 'Bearer ' prefix)
        const token = authHeader.split(' ')[1];
        // console.log('Token:', token);

        // Verify the JWT and extract userId
        const decoded = jwt.verify(token, secretKey);
        const userId = decoded.userId;
        // console.log('Decoded userId:', userId);

        const db = await connectToDatabase();
        const chatCollection = db.collection('Chat_History');

        const chat = await chatCollection.findOne({ userId }, { sort: { _id: -1 } });

        if (!chat) {
            return res.status(404).json({ error: 'No chat history found' });
        }

        res.json(chat.messages);
    } catch (error) {
        console.log('Error retrieving chat history:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});






module.exports = router;
