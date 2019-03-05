module.exports = (app) => {
    const users = require('../controllers/user.controller.js');
    const Categories = require('../controllers/category.controller.js');

    // Create a new User
    app.post('/users', users.create);

    // Retrieve all Users
    app.get('/users', users.findAll);

    // Retrieve a single User with UserId
    app.get('/users/:userName', users.findOne);

    // Update a User with UserId
    app.put('/users/:userId', users.update);

    // Delete a User with UserId
    app.delete('/users/:userId', users.delete);

    // Retrieve all Users
    app.get('/categories', Categories.findAll);
}