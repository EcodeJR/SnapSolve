// routes/index.js
const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('../db/mongodb');

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

module.exports = router;
