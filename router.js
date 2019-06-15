const Auth = require('./controllers/auth')
const passport = require('passport')
require('./services/passport')

const requireAuth = passport.authenticate('jwt', { session: false })
const requireSignIn = passport.authenticate('local', { session: false })

module.exports = function (app) {
  app.get('/', requireAuth, function (_, res) {
    res.send({ success: 'protected route info' })
  })
  app.post('/signin', requireSignIn, Auth.signin)
  app.post('/signup', Auth.signup)
}
