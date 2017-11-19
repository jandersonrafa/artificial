
// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose'); 					// mongoose for mongodb
var port = process.env.PORT || 5000;        // set our port
var database = require('./server/config/database'); 			// load the database config

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// configuration ===============================================================
// Connection options
const defaultOptions = {
    // Use native promises (in driver)
    promiseLibrary: global.Promise,
    useMongoClient: true,
    // Write concern (Journal Acknowledged)
    w: 1,
    j: true
};

function connect(mongoose, dbURI, options = {}) {
    // Merge options with defaults
    const driverOptions = Object.assign(defaultOptions, options);

    // Use Promise from options (mongoose)
    mongoose.Promise = driverOptions.promiseLibrary;

    // Connect
    mongoose.connect(dbURI, driverOptions);

    // If the Node process ends, close the Mongoose connection
    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            process.exit(0);
        });
    });

    return mongoose.connection;
}

connect(mongoose, database.url)

require('./server/controllers')(app);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log("App listening on port " + port);