const express = require('express'); // a web framework of Node.js
const cors = require('cors');
const bodyParser = require('body-parser'); // body-parser is a module that parses the request (of various content types) and creates a req.body object that we can access in our routes.

// create express app
const app = express();
app.use(cors());
console.log('CORS is enabled');

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({ "message": "Welcome to GroupInt application. " });
});

// Require Notes routes
require('./app/routes/slashq.routes.js')(app);

// listen for requests
app.listen(process.env.PORT || 8088, () => {
    console.log("Server is listening on port 8088");
});