var mongoose = require('mongoose'),
    fs = require('fs'),
    path = require('path');

module.exports = function(config) {

  var rootDir = path.dirname(require.main.filename),
      modelDir = path.join(rootDir, 'app/models');
  
  // Connect to mongodb
  var connect = function() {
    var options = {
      server : {
	socketOptions : {
	  keepAlive : 1
	}
      }
    };
    mongoose.connect(config.db, options);
  };

  connect();

  // Error handler
  mongoose.connection.on('error', function(err) {
    console.log(err);
  });

  // Reconnect when closed
  mongoose.connection.on('disconnected', function() {
    connect();
  });

  // Bootstrap models
  fs.readdirSync(modelDir).forEach(function(file) {
    if (~file.indexOf('.js')) {
      require(modelDir + '/' + file);
    }
  });
  
};
