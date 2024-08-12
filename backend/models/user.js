// models/user.js
const { ObjectId } = require('mongodb');

class User {
    constructor(username, passwordHash) {
        this._id = new ObjectId();
        this.username = username;
        this.passwordHash = passwordHash;
    }
}

module.exports = User;