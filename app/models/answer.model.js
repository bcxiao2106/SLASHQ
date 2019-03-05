const mongoose = require('mongoose');

const AnswerSchema = mongoose.Schema({
    sid: Number,
    qid: Number,
    solutionDetails: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Answer', AnswerSchema, 'Answers');