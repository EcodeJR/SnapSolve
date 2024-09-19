// routes/index.js
const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('../db/mongodb');
const { TextPrompt, ImagePrompt } = require('../ai/snap_ai');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

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

// Define a route to handle chat messages
router.post('/chat', async (req, res) => {
    const { userId, message } = req.body;

    // Save the user's message to the database
    const db = await connectToDatabase();
    const chatCollection = db.collection('Chat_History');
    let chat = await chatCollection.findOne({ userId });
    if (!chat) {
        chat = { userId, messages: [] };
    }

    chat.messages.push({ sender: 'user', message, timestamp: new Date() });
    
    if (chat._id) {
        await chatCollection.updateOne({ _id: chat._id }, { $set: { messages: chat.messages } });
    } else {
        const result = await chatCollection.insertOne(chat);
        chat._id = result.insertedId;
    }

    // Call AI API (e.g., OpenAI)
    const botResponse = await TextPrompt(message);

    // Save the bot's response to the database
    chat.messages.push({ sender: 'bot', message: botResponse, timestamp: new Date() });
    await chatCollection.updateOne({ _id: chat._id }, { $set: { messages: chat.messages } });

    // Send the bot's response back to the user
    res.json({ message: botResponse });
});


// Define a route to handle chat messages
router.post('/image', upload.single('image'), async (req, res) => {
    const { userId } = req.body; // No longer expecting 'message' because it's an image
    const imageFile = req.file; // multer adds the uploaded file to req.file

    if (!imageFile) {
        return res.status(400).json({ error: 'No image file uploaded' });
    }

    // Connect to the database
    const db = await connectToDatabase();
    const chatCollection = db.collection('Chat_History');
    let chat = await chatCollection.findOne({ userId });

    if (!chat) {
        chat = { userId, messages: [] };
    }

    // Save the user's image submission (you can log or store the image path if needed)
    const userMessage = 'Image uploaded'; // Placeholder text for user's image submission
    chat.messages.push({ sender: 'user', message: userMessage, timestamp: new Date() });

    // Save/update chat history in database
    if (chat._id) {
        await chatCollection.updateOne({ _id: chat._id }, { $set: { messages: chat.messages } });
    } else {
        const result = await chatCollection.insertOne(chat);
        chat._id = result.insertedId;
    }

    try {
        // Pass the image file path to your AI processing function
        const botResponse = await ImagePrompt(imageFile.path); // Assuming ImagePrompt accepts the image path

        // Save the bot's response to the database
        chat.messages.push({ sender: 'bot', message: botResponse, timestamp: new Date() });
        await chatCollection.updateOne({ _id: chat._id }, { $set: { messages: chat.messages } });

        // Send the bot's response back to the user
        res.json({ message: botResponse });
    } catch (error) {
        console.error('Error processing image:', error);
        res.status(500).json({ error: 'Error processing image' });
    }
});


router.get('/chat-history/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const db = await connectToDatabase();
        const chatCollection = db.collection('Chat_History');
        
        const chat = await chatCollection.findOne({ userId });

        if (!chat) {
            return res.status(404).json({ error: 'No chat history found' });
        }

        res.json(chat.messages);
    } catch (error) {
        console.error('Error retrieving chat history:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



module.exports = router;
