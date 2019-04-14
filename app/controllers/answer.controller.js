const Answer = require('../models/answer.model');

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if ((!req.body.sid)) { //|| (!req.body.password) || (!req.body.email)
        return res.status(400).send({
            message: "sid and solutionDetails can not be empty"
        });
    }

    // Create a Category
    const answer = new Answer({
        sid: req.body.sid,
        qid: req.body.qid,
        solutionDetails: req.body.solutionDetails
    });

    // Save User in the database
    answer.save()
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
    Answer.find()
        .then(Answers => {
            Answers.forEach(answer => {
                console.log(answer);
            });
            res.send(Answers);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving categories."
            });
        });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
    console.log(req.params.sid);
    Answer.find({ sid: req.params.sid })
        .then(answer => {
            if (!answer) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.sid
                });
            }
            res.send(answer);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Category not found with id " + req.params.sid
                });
            }
            return res.status(500).send({
                message: "Error retrieving user with id " + req.params.sid
            });
        });
};

//Find answers by questionId
exports.findByQuestionId = (req, res) => {
    console.log(req.params.qid);
    Answer.find({ qid: req.params.qid })
        .then(answer => {
            if (!answer) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.qid
                });
            }
            res.send(answer);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Category not found with id " + req.params.qid
                });
            }
            return res.status(500).send({
                message: "Error retrieving user with id " + req.params.qid
            });
        });
}

// Update a user identified by the userId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.content) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }

    // Find user and update it with the request body
    Answer.findByIdAndUpdate(req.params.sid, {
            qid: req.body.qid,
            solutionDetails: req.body.solutionDetails
        }, { new: true })
        .then(answer => {
            if (!answer) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.sid
                });
            }
            res.send(answer);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.sid
                });
            }
            return res.status(500).send({
                message: "Error updating user with id " + req.params.sid
            });
        });
};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
    Answer.findByIdAndRemove(req.params.sid)
        .then(answer => {
            if (!answer) {
                return res.status(404).send({
                    message: "Answer not found with id " + req.params.sid
                });
            }
            res.send({ message: "Answer deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Answer not found with id " + req.params.sid
                });
            }
            return res.status(500).send({
                message: "Could not delete user with id " + req.params.sid
            });
        });
};