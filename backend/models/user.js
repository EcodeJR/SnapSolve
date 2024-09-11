// models/user.js
const { ObjectId } = require('mongodb');

class UserNew {
    constructor(username, email, passwordHash) {
        this._id = new ObjectId();
        this.username = username;
        this.email = email;
        this.passwordHash = passwordHash;
    }
}
class User {
    constructor(email, passwordHash) {
        this._id = new ObjectId();
        this.email = email;
        this.passwordHash = passwordHash;
    }
}

module.exports = {UserNew, User};