const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')

describe('with one initial user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    
    const passwordHash = bcrypt.hash('Salaisuus', 10)
    const user = new User({
      name: 'Ronja',
      username: 'pahis',
      passwordHash
    })
    await user.save()
  })
  
  test('one user returned as json', async () => {
    const users = await api.get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    expect(users.body).toHaveLength(1)
  })
  
  test('the user cannot added without password', async () => {
    const newUser = { name: 'Matti', username: 'Meikäläinen' }
    
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    
    expect(result.body.error).toContain('password must be at least 3 characters')
  })
  
  test('user creation failed if the username found', async () => {
    const usersAtStart = await api.get('/api/users')
    const newUser = {
      name: 'Samuli',
      username: 'pahis',
      password: 'salainen'
    }
    
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
    expect(result.body.error).toContain('ups, someone else had time first, try another username')

    const usersAtEnd = await api.get('/api/users')
    expect(usersAtEnd.body).toHaveLength(usersAtStart.body.length)
  })
  
  test('user cannot added without username, return username validation error', async () => {
    const usersAtStart = await api.get('/api/users')
    const newUser = {
      name: 'Meigä',
      password: 'salasana'
    }
    
    result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
    expect(result.body.error).toContain('User validation failed')
    
    const usersAtEnd = await api.get('/api/users')
    expect(usersAtEnd.body).toHaveLength(usersAtStart.body.length)
  })
})