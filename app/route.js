var home = require('./controllers/home');

module.exports = function(app) {
  app.get('/', home.index);
};
