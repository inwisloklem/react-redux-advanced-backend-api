const User = require('../models/user')

module.exports = {
  async signup (req, res, next) {
    const { email, password } = req.body

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
