const jwt = require('jwt-simple')
const { secret } = require('../config')
const User = require('../models/user')

function makeToken (user) {
  return jwt.encode({ sub: user._id, iat: Date.now() }, secret)
}

module.exports = {
  async signup (req, res, next) {
    const { email, password } = req.body

    if (!email || !password) {
      return res
        .status(422)
        .send({ error: 'E-mail and password should be provided.' })
    }

    try {
      if (await User.findOne({ email })) {
        return res.status(422).send({ error: 'E-mail is in use.' })
      }
    } catch (err) {
      return next(err)
    }

    const user = new User({
      email,
      password
    })

    try {
      await user.save()
      res.json({ token: makeToken(user) })
    } catch (err) {
      return next(err)
    }
  }
}
