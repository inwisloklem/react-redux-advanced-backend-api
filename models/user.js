const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: { type: String, lowercase: true, unique: true },
  password: String
})

userSchema.pre('save', async function (next) {
  const user = this

  try {
    user.password = await bcrypt.hash(user.password, 12)
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
