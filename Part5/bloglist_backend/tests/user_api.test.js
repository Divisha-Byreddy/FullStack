const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const helper = require('./test_helper')
const User = require('../models/user')
const bcrypt = require('bcrypt')

beforeEach(async () =>{
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('password',10)
  const user = new User({ username : 'root' , passwordHash})
  await user.save()
})

describe('when a user is added',() =>{
  test('with unique details creation is succeeded', async () =>{
    const initialUsers = await helper.usersList()  
    const user = {
      username : 'test',
      name : 'test123',
      password : 'hello'
    }  
    await api
      .post('/api/users')
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const finalUsers = await helper.usersList()  
    expect(finalUsers).toHaveLength(initialUsers.length + 1 )
      
  })

  test('with invalid details, creation fails',async () =>{
    const initialUsers = await helper.usersList()  
    const user = {
      username : '12',
      name : 'hello',
      password : 'test'
    }  
    const result = await api 
      .post('/api/users')
      .send(user)
      .expect(400)  
    expect(result.body.error).toContain('`username` (`12`) is shorter than the minimum allowed length (3)')
    const finalUsers = await helper.usersList()
    expect(finalUsers).toHaveLength(initialUsers.length)
            
  })

  test('creation fails if the username is not unique', async () =>{
    const initialUsers = await helper.usersList()  
    const user = {
      username : 'root',
      name : 'hello',
      password : 'test'
    }  
    const result = await api 
      .post('/api/users')
      .send(user)
      .expect(400)
    
    expect(result.body.error).toContain('`username` to be unique')
    const finalUsers = await helper.usersList()
    expect(finalUsers).toHaveLength(initialUsers.length)
  })
})

afterAll(() =>{
  mongoose.connection.close()
})