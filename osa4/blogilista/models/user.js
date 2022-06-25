const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: String,
  username: {
    type: String,
    required: true,
    min: 3
  },
  passwordHas: String
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

module.exports = mongoose.model('User', userSchema)
