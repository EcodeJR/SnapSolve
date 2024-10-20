// models/user.js
const { ObjectId } = require('mongodb');

class UserNew {
    constructor(firstname, lastname, username, email, passwordHash) {
        this._id = new ObjectId();
        this.firstname = firstname;
        this.lastname = lastname;
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