const mongoose = require('mongoose');

const QuestionSchema = mongoose.Schema({
    qid: Number,
    cid: Number,
    questionTitle: String,
    questionDesc: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Question', QuestionSchema, 'Questions');