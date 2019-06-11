const User = require('../models/user')

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
      res.json({ success: true })
    } catch (err) {
      return next(err)
    }
  }
}
