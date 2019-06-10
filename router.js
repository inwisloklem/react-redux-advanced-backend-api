const Auth = require('./controllers/auth')

module.exports = function (app) {
  app.post('/signup', Auth.signup)
}
