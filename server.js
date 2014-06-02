/**
 * Module dependencies.
 */

var express = require('express'),
    http = require('http'),
    path = require('path');


// Load configuration
var env = process.env.NODE_ENV || 'development',
    rootDir = path.dirname(require.main.filename);

var config = require(rootDir + '/app/config/config')[env];

// Configure express
var app = express();
require(rootDir +  '/app/config/express')(app, config);

// Configure mongoose
require(rootDir +  '/app/config/mongoose')(config);

// Bootstrap routing
require(rootDir +  '/app/route')(app);

// Run application
app.listen(app.get('port'));
