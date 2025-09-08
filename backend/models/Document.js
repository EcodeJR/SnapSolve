// models/Document.js
const { ObjectId } = require('mongodb');

class Document {
    constructor(userId, textContent, correctedText, suggestions) {
        this._id = new ObjectId();
        this.userId = new ObjectId(userId);
        this.textContent = textContent;
        this.correctedText = correctedText;
        this.suggestions = suggestions;
        this.type = 'analysis';
        this.createdAt = new Date();
    }
}

module.exports = Document;