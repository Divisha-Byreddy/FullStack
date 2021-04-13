const Blog = require('../models/blog')
const User = require('../models/user')
const blogs = [
  {
    title  : 'The Alchemist',
    author : 'Paul',
    url    : 'dummy',
    likes  :  5  
  },
  {
    title : '123',
    author:'Hello',
    url  :'dummy1', 
    likes:7
  }
]

const blogsList = async () =>{
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersList = async () =>{
  const users = await User.find({})
  return users.map(x => x.toJSON())
}

const getToken = async (api) =>{
  var user = {
    username : 'root',
    password : 'password'
  }
  
  const response = await api
    .post('/api/login')
    .send(user)
    .expect(200)

  return response.body.token
   
}

module.exports = {
  blogs,
  blogsList,
  usersList,
  getToken
}