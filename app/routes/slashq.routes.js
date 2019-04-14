module.exports = (app) => {
    const users = require('../controllers/user.controller.js');
    const Categories = require('../controllers/category.controller.js');
    const Answers = require('../controllers/answer.controller.js');
    const Questions = require('../controllers/question.controller.js');

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


    // Create a new Category
    app.post('/categories', Categories.create);

    // Retrieve all Categories
    app.get('/categories', Categories.findAll);

    // Retrieve a single Category with UserId
    app.get('/categories/:cid', Categories.findOne);

    // Update a Category with cid
    app.put('/categories/:cid', Categories.update);

    // Delete a Category with cid
    app.delete('/categories/:cid', Categories.delete);


    // Create a new Answer
    app.post('/answers', Answers.create);

    // Retrieve all Answers
    app.get('/answers', Answers.findAll);

    // Retrieve a single Answer with sid
    app.get('/answers/:sid', Answers.findOne);

    // Retrieve a single Answer with qid
    app.get('/answers/Q/:qid', Answers.findByQuestionId);

    // Update a Answer with sid
    app.put('/answers/:sid', Answers.update);

    // Delete a Answer with sid
    app.delete('/answers/:sid', Answers.delete);


    // Create a new Question
    app.post('/questions', Questions.create);

    // Retrieve all Questions
    app.get('/questions', Questions.findAll);

    // Retrieve a single Question with qid
    app.get('/questions/:qid', Questions.findOne);

    // Update a Question with qid
    app.put('/questions/:sid', Questions.update);

    // Delete a Question with qid
    app.delete('/questions/:qid', Questions.delete);
}