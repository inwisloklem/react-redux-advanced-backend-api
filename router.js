const Auth = require('./controllers/auth')
const passport = require('passport')
require('./services/passport')

const requireAuth = passport.authenticate('jwt', { session: false })

module.exports = function (app) {
  app.get('/', requireAuth, function (_, res) {
    res.send({ hi: 'there' })
  })
  app.post('/signup', Auth.signup)
}
