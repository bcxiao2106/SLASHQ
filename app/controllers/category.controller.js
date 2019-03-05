const Category = require('../models/category.model');

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if ((!req.body.cid)) { //|| (!req.body.password) || (!req.body.email)
        return res.status(400).send({
            message: "cid and categoryName can not be empty"
        });
    }

    // Create a Category
    const category = new Category({
        cid: req.body.cid,
        categoryName: req.body.categoryName
    });

    // Save User in the database
    category.save()
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
    Category.find()
        .then(Categories => {
            Categories.forEach(category => {
                console.log(category);
            });
            res.send(Categories);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving categories."
            });
        });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
    console.log(req.params.cid);
    Category.find({ cid: req.params.cid })
        .then(category => {
            if (!category) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.cid
                });
            }
            res.send(category);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Category not found with id " + req.params.cid
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
    Category.findByIdAndUpdate(req.params.cid, {
            categoryName: req.body.categoryName
        }, { new: true })
        .then(category => {
            if (!category) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.cid
                });
            }
            res.send(category);
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
    Category.findByIdAndRemove(req.params.cid)
        .then(category => {
            if (!category) {
                return res.status(404).send({
                    message: "Category not found with id " + req.params.cid
                });
            }
            res.send({ message: "Category deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Category not found with id " + req.params.cid
                });
            }
            return res.status(500).send({
                message: "Could not delete user with id " + req.params.cid
            });
        });
};