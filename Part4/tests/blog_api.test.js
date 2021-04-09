const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const api = supertest(app)
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const logger = require('../utils/logger')

beforeEach(async () =>{
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('password',10)
  const user = new User({ username : 'root' , passwordHash})
  await user.save()
  await Blog.deleteMany({})
  const blogObjects = helper.blogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
   
  expect(response.body).toHaveLength(helper.blogs.length)
})

test('unique identifier of blogs is named id', async () =>{
  const response = await api.get('/api/blogs')
  const blogs = response.body
  expect(blogs[0].id).toBeDefined()
})

describe('addition of a blog',() =>{
  test('succeeds if all valid details are given', async () =>{
    var newBlog = {
      title :'123',
      author:'Hello',
      url :'dummy1',
      likes : 7
    }

    const token = await helper.getToken(api)
    logger.info(token)
    await  api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    const newBlogs = await helper.blogsList()
    expect(newBlogs).toHaveLength(helper.blogs.length + 1)

    const author = newBlogs.map(x => x.author)
    expect(author).toContain('Hello')
    
  })
  
  test('succeeds by assigning a default value to likes if it is not present ', async () =>{
    var newBlog = {
      title :'123',
      author:'Hello123',
      url :'dummy1'
    }
    const token = await helper.getToken(api)
    await  api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    const newBlogs = await helper.blogsList()
    expect(newBlogs).toHaveLength(helper.blogs.length + 1)  
    const savedBlog = newBlogs.find(x => x.author == newBlog.author)
    expect(savedBlog.likes).toBe(0)
      
  })
  
  test('fails if title and url are not given', async () =>{
    var newBlog = {
      author:'Hello123',
      url :'dummy1'
    }
  
    const token = await helper.getToken(api)
    await  api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)
    
    newBlog = {
      title :'123',
      author:'Hello123'
    }
  
    await  api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)
    
    const result = await helper.blogsList()
    expect(result).toHaveLength(helper.blogs.length)
  })

  test('fails if token is not given', async () =>{
    var newBlog = {
      author:'Hello123',
      url :'dummy1'
    }

    await  api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
  })
})

describe('deletion of a blog' ,() =>{
  test('succeeds with status code 204 if id is valid', async () =>{
    //creating a new blog to link it to the user for test purpose
    var newBlog = {
      title :'123',
      author:'Hello123',
      url :'dummy1'
    }
    const token = await helper.getToken(api)
    await  api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const blogs =await helper.blogsList()
    expect(blogs).toHaveLength(helper.blogs.length + 1 )

    const blogToDelete = blogs[2]
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)
    
    const updatedblogs = await helper.blogsList()
    expect(updatedblogs).toHaveLength(helper.blogs.length)

    const authors = updatedblogs.map(x => x.author)
    expect(authors).not.toContain(blogToDelete.author)
  })
})

describe('updating a blog',() =>{
  test('succeeds if id is valid', async () =>{
    const blogs = await helper.blogsList()
    const blogToUpdate = blogs[0]
    blogToUpdate.likes = 10

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)

    const updatedBlogsList = await helper.blogsList()
    expect(updatedBlogsList[0].likes).toBe(blogToUpdate.likes)
    expect(updatedBlogsList).toHaveLength(helper.blogs.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})