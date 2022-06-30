const User = require('../models/user')
const jwt = require('jsonwebtoken')
const logger = require('./logger')

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    request.token = authorization.substring(7)
  } else {
    request.token = null
  }
  next()
}

const errorHandler = (err, req, res, next) => {
  logger.error(err.message)

  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  } else if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'invalid token'
    })
  }
  
  next(err)
}

const userExtractor = async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'invalid or missing token'})
    }
  
    request.user = await User.findById(decodedToken.id)
    next()
  
  } catch(exception) {
    next(exception)
    return
  }
  
}

module.exports = { tokenExtractor, errorHandler, userExtractor }
