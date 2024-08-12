// db/mongodb.js
require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;

let client;
let db;

async function connectToDatabase() {
    if (!client) {
        client = new MongoClient(uri);
        await client.connect();
        console.log("Connected to MongoDB!");
        db = client.db('Snapsolve'); // Replace 'myDatabase' with your database name
    }
    return db;
}

module.exports = { connectToDatabase };