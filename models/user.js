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

// https://stackoverflow.com/questions/6832445/how-can-bcrypt-have-built-in-salts
userSchema.methods.comparePasswords = async function (password, callback) {
  try {
    const isMatch = await bcrypt.compare(password, this.password)
    callback(null, isMatch)
  } catch (err) {
    callback(err)
  }
}

module.exports = mongoose.model('user', userSchema)
