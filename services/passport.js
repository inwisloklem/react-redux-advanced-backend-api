const passport = require('passport')
const { ExtractJwt, Strategy: JwtStrategy } = require('passport-jwt')
const { secret } = require('../config')
const LocalStrategy = require('passport-local')
const User = require('../models/user')

async function jwtVerifyCallback (payload, done) {
  try {
    const user = await User.findOne({ _id: payload.sub })
    user ? done(null, user) : done(null, false)
  } catch (err) {
    done(err, false)
  }
}

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader('authorization'),
      secretOrKey: secret
    },
    jwtVerifyCallback
  )
)

async function localVerifyCallback (email, password, done) {
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return done(null, false)
    }

    user.comparePasswords(password, function (err, isMatch) {
      err ? done(err) : isMatch ? done(null, user) : done(null, false)
    })
  } catch (err) {
    done(err, false)
  }
}

passport.use(new LocalStrategy({ usernameField: 'email' }, localVerifyCallback))
