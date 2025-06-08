// routes/index.js
require('dotenv').config();
const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('../db/mongodb');
const { ObjectId } = require('mongodb');
const { TextPrompt, ImagePrompt, generateStudyGuide, analyzeWriting } = require('../ai/snap_ai');
const multer = require("multer");
const upload = multer();
const fs = require("fs");
const jwt = require('jsonwebtoken'); // For verifying the JWT
const authenticateOptional = require('../authenticate/authMiddleware');
const nodemailer = require('nodemailer');
const secretKey = process.env.JWT_SECRET_KEY || 'your_secret_key';

const { StudyGuide } = require("../models/StudyGuide");

const Document = require("../models/Document");

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
            timestamp: new Date(),
            type: 'chat',
            createdAt: new Date() // Add this line
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
        const { title, content } = await ImagePrompt(base64Image);

        if (!userId) {
            return res.json({ botResponse: content, title });
        }

        const db = await connectToDatabase();
        const chatCollection = db.collection("Chat_History");
        const imagesCollection = db.collection("Images");

        const imageDocument = await imagesCollection.insertOne({
            userId,
            image: base64Image,
            mimeType: "image/jpeg",
            createdAt: new Date(),
        });

        // In the image route
        const newMessage = {
            _id: new ObjectId(),
            message: title, // Use the extracted title here
            botResponse: content,
            imageId: imageDocument.insertedId,
            timestamp: new Date(),
            type: 'image',
            createdAt: new Date()
        };

        await chatCollection.updateOne(
            { userId },
            { $push: { messages: newMessage } },
            { upsert: true }
        );
        // console.log("Chat history updated");

        res.json({ botResponse: content, title });
    } catch (error) {
        console.error("Image Error:", error.message);
        res.status(500).json({ error: "Error processing image. Try Again" });
    }
});


// Analyze text for grammar, spelling, and logic errors

router.post("/analyze", authenticateOptional, async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ error: "Text input is required" });
        }

        // AI analyzes the text
        const { correctedText, suggestions } = await analyzeWriting(text);

        // If user is authenticated, save to database
        if (req.userId) {
            const document = new Document(
                req.userId,
                text,
                correctedText,
                suggestions
            );

            const db = await connectToDatabase();
            const documentsCollection = db.collection('Documents');
            await documentsCollection.insertOne(document);
        }

        res.json({ 
            message: "Analysis complete", 
            correctedText, 
            suggestions 
        });

    } catch (error) {
        console.error("Analysis Error:", error);
        res.status(500).json({ error: "Error analyzing text. " + error.message });
    }
});


// Update the generate route to use the new StudyGuide class

router.post("/generate", authenticateOptional, async (req, res) => {
  try {
    const { topic } = req.body;
    if (!topic) {
      return res.status(400).json({ error: "Topic is required" });
    }

    // AI generates study content
    const { studyNotes, resources, quiz } = await generateStudyGuide(topic);

    // Create response object
    const guide = {
      topic,
      studyNotes,
      resources,
      quiz
    };

    // If user is authenticated, save to database
    if (req.userId) {
      const studyGuide = new StudyGuide(
        req.userId,
        topic,
        studyNotes,
        resources,
        quiz
      );

      const db = await connectToDatabase();
      const studyGuidesCollection = db.collection('StudyGuides');
      await studyGuidesCollection.insertOne(studyGuide);
    }

    res.json({ 
      message: "Study guide generated", 
      guide
    });

  } catch (error) {
    console.error("Study Guide Error:", error);
    res.status(500).json({ error: error.message || "Error generating study guide" });
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
      console.log("Mail Error:", error);
    }
  });

  // Add these new routes after existing ones

// Get analysis history
router.get('/analysis-history', authenticateOptional, async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        const db = await connectToDatabase();
        const documentsCollection = db.collection('Documents');
        const history = await documentsCollection
            .find({ userId: new ObjectId(req.userId) })
            .sort({ createdAt: -1 })
            .toArray();

        res.json(history);
    } catch (error) {
        console.error('Analysis History Error:', error);
        res.status(500).json({ error: 'Failed to fetch analysis history' });
    }
});

// Delete analysis
router.delete('/delete-analysis/:analysisId', authenticateOptional, async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        const db = await connectToDatabase();
        const documentsCollection = db.collection('Documents');
        
        const result = await documentsCollection.deleteOne({
            _id: new ObjectId(req.params.analysisId),
            userId: new ObjectId(req.userId)
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Analysis not found' });
        }

        res.json({ message: 'Analysis deleted successfully' });
    } catch (error) {
        console.error('Delete Analysis Error:', error);
        res.status(500).json({ error: 'Failed to delete analysis' });
    }
});

// Get study guide history
router.get('/study-guide-history', authenticateOptional, async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        const db = await connectToDatabase();
        const studyGuidesCollection = db.collection('StudyGuides');
        const history = await studyGuidesCollection
            .find({ userId: new ObjectId(req.userId) })
            .sort({ createdAt: -1 })
            .toArray();

        res.json(history);
    } catch (error) {
        console.error('Study Guide History Error:', error);
        res.status(500).json({ error: 'Failed to fetch study guide history' });
    }
});

// Delete study guide
router.delete('/delete-guide/:guideId', authenticateOptional, async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        const db = await connectToDatabase();
        const studyGuidesCollection = db.collection('StudyGuides');
        
        const result = await studyGuidesCollection.deleteOne({
            _id: new ObjectId(req.params.guideId),
            userId: new ObjectId(req.userId)
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Study guide not found' });
        }

        res.json({ message: 'Study guide deleted successfully' });
    } catch (error) {
        console.error('Delete Study Guide Error:', error);
        res.status(500).json({ error: 'Failed to delete study guide' });
    }
});


module.exports = router;