const Question = require('../models/question.model');

// Create and Save a new User
exports.create = (req, res) => {

    // Validate request
    if ((!req.body.questionTitle)) { //|| (!req.body.password) || (!req.body.email)
        return res.status(400).send({
            message: "questionTitle can not be empty"
        });
    }

    var qid = Question.findOne().sort(-qid).qid + 1;

    // Create a Question
    const question = new Question({
        qid: qid,
        cid: req.body.cid,
        questionTitle: req.body.questionTitle,
        questionDesc: req.body.questionDesc
    });

    // Save User in the database
    question.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the User."
            });
        });
}

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    Question.find()
        .then(questions => {
            questions.forEach(question => {
                console.log(question);
            });
            res.send(questions);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving questions."
            });
        });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
    console.log(req.params.cid);
    Question.find({ cid: req.params.cid })
        .then(question => {
            if (!question) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.cid
                });
            }
            res.send(question);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Question not found with id " + req.params.cid
                });
            }
            return res.status(500).send({
                message: "Error retrieving user with id " + req.params.cid
            });
        });
};

// Update a user identified by the userId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.content) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }

    // Find user and update it with the request body
    Question.findByIdAndUpdate(req.params.qid, {
            questionTitle: req.body.questionTitle,
            questionDesc: req.body.questionDesc
        }, { new: true })
        .then(question => {
            if (!question) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.cid
                });
            }
            res.send(question);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.cid
                });
            }
            return res.status(500).send({
                message: "Error updating user with id " + req.params.cid
            });
        });
};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
    Question.findByIdAndRemove(req.params.cid)
        .then(question => {
            if (!question) {
                return res.status(404).send({
                    message: "Question not found with id " + req.params.cid
                });
            }
            res.send({ message: "Question deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Question not found with id " + req.params.cid
                });
            }
            return res.status(500).send({
                message: "Could not delete user with id " + req.params.cid
            });
        });
};