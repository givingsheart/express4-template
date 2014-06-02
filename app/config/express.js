
var methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    morgan = require('morgan'), // logger
    bodyParser = require('body-parser'),
    favicon = require('static-favicon'),
    errorHandler = require('errorhandler'),
    ejs = require('ejs'),
    express = require('express'),
    path = require('path');

// ejs.open = '{{';
// ejs.close = '}}';

module.exports = function(app, config) {

  var env = config.mode || 'development',
      port = config.port || 3000,
      rootDir = path.dirname(require.main.filename);

  app.set('port', port);
  app.use(express.static(path.join(rootDir, 'public')));
  app.use(morgan('dev')); // log every request to the console
  
  app.set('views', path.join(rootDir, 'app/views'));
  app.engine('.html', ejs.__express);
  app.set('view engine', 'html');
  
  app.use(methodOverride()); // simulate DELETE and PUT
  app.use(bodyParser()); // pull information from html in POST
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded());
  
  app.use(cookieParser());
  app.use(session({
    secret : 'express-template'
  }));

  // development only
  if ( app.get('env') === 'development' ) {
    app.use(errorHandler());
  }

  console.log("\n\tStarting Express PORT : " + port + "\n");
};
