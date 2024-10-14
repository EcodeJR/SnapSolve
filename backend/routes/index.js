// routes/index.js
require('dotenv').config();
const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('../db/mongodb');
const { ObjectId } = require('mongodb');
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
            // chat = { userId, messages: [] };
            // Call AI API
            const botResponse = await TextPrompt(message);
            res.json({ botResponse: botResponse });
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

        // Create a new message object with a unique _id
        const newMessage = {
            _id: new ObjectId(),
            message: message,
            botResponse: botResponse,
            timestamp: new Date()
        };

        // Add the new message to the chat.messages array
        chat.messages.push(newMessage);

        // Update the document in the database
        await chatCollection.updateOne(
            { _id: chat._id },
            { $push: { messages: newMessage } }
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

        // Process the image using AI API (Do this before updating chat)
        const botResponse = await ImagePrompt(imageFile.path); // Assuming ImagePrompt accepts the image path

        const userMessage = 'Image uploaded'; // Define the userMessage after image upload

        // Create a new message object with the image upload and AI response
        const newMessage = {
            _id: new ObjectId(), // Create a unique _id for the new message
            message: userMessage, // User's message
            botResponse: botResponse, // AI's response
            timestamp: new Date() // Timestamp for the message
        };

        // If chat exists, update the chat history
        if (chat._id) {
            await chatCollection.updateOne(
                { _id: chat._id }, // Find the chat by _id
                { $push: { messages: newMessage } } // Push the new message into the messages array
            );
        } else {
            // If no chat exists, create a new chat document with the first message
            chat.messages.push(newMessage);
            const result = await chatCollection.insertOne(chat);
            chat._id = result.insertedId; // Assign the new chat _id
        }

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

router.delete('/delete-history/:messageId', async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];

        // Check if the Authorization header is present and properly formatted
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized access, no token provided' });
        }

        // Extract the token (remove 'Bearer ' prefix)
        const token = authHeader.split(' ')[1];

        // Verify the JWT and extract userId
        const decoded = jwt.verify(token, secretKey);
        const userId = decoded.userId;

        const db = await connectToDatabase();
        const chatCollection = db.collection('Chat_History');

        const messageId = req.params.messageId;

        // Check if messageId is a valid ObjectId (24 hex chars), if not skip ObjectId conversion
        const isValidObjectId = ObjectId.isValid(messageId) && String(new ObjectId(messageId)) === messageId;
        const objectId = isValidObjectId ? new ObjectId(messageId) : messageId;

        // Delete a specific message by its _id and userId
        const result = await chatCollection.updateOne(
            { userId }, // Match the userId
            { $pull: { messages: { _id: objectId } } } // Remove the specific message (with or without ObjectId)
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ error: 'No chat message found to delete' });
        }

        res.json({ message: 'Chat message deleted successfully' });
    } catch (error) {
        console.log('Error deleting chat message:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;