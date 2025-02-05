// routes/index.js
require('dotenv').config();
const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('../db/mongodb');
const { ObjectId } = require('mongodb');
const { TextPrompt, ImagePrompt } = require('../ai/snap_ai');
const multer = require("multer");
const upload = multer();
const fs = require("fs");
const jwt = require('jsonwebtoken'); // For verifying the JWT
const authenticateOptional = require('../authenticate/authMiddleware');
const nodemailer = require('nodemailer');
const secretKey = process.env.JWT_SECRET_KEY || 'your_secret_key';

router.get('/', (req, res) => {
    res.send("server is running...");
});

// Applying middleware to the /chat route
router.post('/chat', authenticateOptional, async (req, res) => {
    const userId = req.userId;
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    try {
        const botResponse = await TextPrompt(message); // Get bot response

        // If the user is not authenticated, just return the bot's response without saving
        if (!userId) {
            return res.json({ botResponse: botResponse });
        }

        // User is authenticated, proceed to save the chat
        const db = await connectToDatabase();
        const chatCollection = db.collection('Chat_History');
        let chat = await chatCollection.findOne({ userId });

        if (!chat) {
            chat = { userId, messages: [] };
        }

        const newMessage = {
            _id: new ObjectId(),
            message,
            botResponse,
            timestamp: new Date()
        };

        await chatCollection.updateOne(
            { userId },
            { $push: { messages: newMessage } },
            { upsert: true }  // Creates chat if it doesn't exist
        );

        res.json({ botResponse: botResponse });

    } catch (error) {
        if (!res.headersSent) {
            res.status(500).json({ error: 'Internal Server Error. Try Again' });
            console.log("Chat Error:", error)
        }
    }
});



router.post("/image", authenticateOptional, upload.single("image"), async (req, res) => {
    const userId = req.userId;
    const imageFile = req.file;
    // console.log(userId)
    // console.log(imageFile)


    if (!imageFile) {
        return res.status(400).json({ error: "No image file uploaded" });
    }

    try {
        const base64Image = imageFile.buffer.toString("base64");
        // console.log("Base64 Image:", base64Image);

        const botResponse = await ImagePrompt(base64Image);
        // console.log("Generated bot response:", botResponse);

        if (!userId) {
            return res.json({ botResponse });
        }

        const db = await connectToDatabase();
        // console.log("Database connected:", db !== undefined);

        const chatCollection = db.collection("Chat_History");
        const imagesCollection = db.collection("Images");

        const imageDocument = await imagesCollection.insertOne({
            userId,
            image: base64Image,
            mimeType: "image/jpeg",
            createdAt: new Date(),
        });
        // console.log("Image stored successfully:", imageDocument.insertedId);

        const newMessage = {
            _id: new ObjectId(),
            message: "Image uploaded",
            botResponse,
            imageId: imageDocument.insertedId,
            timestamp: new Date(),
        };

        await chatCollection.updateOne(
            { userId },
            { $push: { messages: newMessage } },
            { upsert: true }
        );
        // console.log("Chat history updated");

        res.json({ botResponse });
    } catch (error) {
        console.error("Image Error:", error.message);
        res.status(500).json({ error: "Error processing image. Try Again" });
    }
});




router.get('/chat-history', async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];

        // Checking if the Authorization header is present and properly formatted
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized access, no token provided' });
        }

        // Extracts the token (remove 'Bearer ' prefix)
        const token = authHeader.split(' ')[1];

        // Verifying the JWT and extract userId
        const decoded = jwt.verify(token, secretKey);
        const userId = decoded.userId;

        const db = await connectToDatabase();
        const chatCollection = db.collection('Chat_History');

        const chat = await chatCollection.findOne({ userId }, { sort: { _id: -1 } });

        if (!chat) {
            return res.status(404).json({ error: 'No chat history found' });
        }

        res.json(chat.messages);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error, Login Again.' });
        // console.log("Chat History Error:", error)
    }
});

router.delete('/delete-history/:messageId', async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];

        // Checking if the Authorization header is present and properly formatted
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized access, no token provided' });
        }

        // Extracts the token (remove 'Bearer ' prefix)
        const token = authHeader.split(' ')[1];

        // Verifying the JWT and extract userId
        const decoded = jwt.verify(token, secretKey);
        const userId = decoded.userId;

        const db = await connectToDatabase();
        const chatCollection = db.collection('Chat_History');

        const messageId = req.params.messageId;

        // Checking if messageId is a valid ObjectId (24 hex chars), if not skip ObjectId conversion
        const isValidObjectId = ObjectId.isValid(messageId) && String(new ObjectId(messageId)) === messageId;
        const objectId = isValidObjectId ? new ObjectId(messageId) : messageId;

        // Deletes a specific message by its _id and userId
        const result = await chatCollection.updateOne(
            { userId }, // Match the userId
            { $pull: { messages: { _id: objectId } } } // Remove the specific message (with or without ObjectId)
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ error: 'No chat message found to delete' });
        }

        res.json({ message: 'Chat message deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error. Try Again' });
        // console.log("Deleting History Error:",error)
    }
});


router.post('/sendEmail', async (req, res) => {
    const { name, email, message } = req.body;
  
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }
  
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail', // email provider
        auth: {
          user: process.env.EMAIL_USER, // email address
          pass: process.env.EMAIL_PASS, // email password
        },
      });
  
      const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER, 
        subject: `Contact Form Submission from ${name}`,
        text: `You have a new contact form submission from ${name}.\n\nEmail: ${email}\nMessage: ${message}`,
      };
  
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error sending email. Try Again' });
    //   console.log("Mail Error:", error);
    }
  });

module.exports = router;