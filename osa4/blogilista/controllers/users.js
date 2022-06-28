const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
  .populate('blogs')

  response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body
  if (!password || password.length < 3) {
    return response.status(400).json({
      error: 'the password must be at least 3 characters'
    })
  }
  
  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'ups, someone else had time first, try another username'
    })
  }
  
  const passwordHash = await bcrypt.hash(password, 10)
  
  const user = new User({
    username,
    name,
    passwordHash
  })
  
  try {
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch(exception) {
    next(exception)
  }
})

module.exports = usersRouter