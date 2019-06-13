const passport = require('passport')
const { ExtractJwt, Strategy } = require('passport-jwt')
const { secret } = require('../config')
const User = require('../models/user')

const jwtLogin = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: secret
  },
  async function (payload, done) {
    try {
      const user = await User.findOne({ _id: payload.sub })
      user ? done(null, user) : done(null, false)
    } catch (err) {
      done(err, false)
    }
  }
)

passport.use(jwtLogin)
