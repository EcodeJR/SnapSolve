const { ObjectId } = require('mongodb');

class StudyGuide {
    constructor(userId, topic, studyNotes, resources = [], quiz = []) {
        this._id = new ObjectId();
        this.userId = new ObjectId(userId);
        this.topic = topic;
        this.studyNotes = studyNotes;
        this.resources = resources;
        this.quiz = quiz;
        this.type = 'study';
        this.createdAt = new Date();
    }
}

class QuizQuestion {
    constructor(question, options, correctAnswer) {
        this.question = question;
        this.options = options;
        this.correctAnswer = correctAnswer;
    }
}

module.exports = { StudyGuide, QuizQuestion };