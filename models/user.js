const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: { type: String, lowercase: true, unique: true },
  password: String
})

userSchema.pre('save', async function (next) {
  const user = this

  try {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(user.password, salt)
    user.password = hash
    next()
  } catch (err) {
    return next(err)
  }
})

module.exports = mongoose.model('user', userSchema)
