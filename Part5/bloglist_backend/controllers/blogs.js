const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')
const logger = require('../utils/logger')

blogRouter.get('/', async (request,response) =>{
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', userExtractor, async (request,response) =>{
  const body = request.body

  const user = request.user 

  const blog = new Blog({
    title : body.title,
    author : body.author,
    url : body.url,
    likes : body.likes,
    user : user._id
  })

  if (!blog.url || !blog.title) {
    return response.status(400).send({ error: 'title or url missing ' })
  }

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.find(x => x.id === savedBlog.id))
    
})

blogRouter.delete('/:id', userExtractor, async (request,response) =>{
  const user = request.user
  const blog = await Blog.findById(request.params.id)
  logger.info(blog)
  if(blog.user.toString() === user.id){
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }
  else{
    return response.status(401).json({
      error : 'invalid user'
    })
  }
  
})

blogRouter.put('/:id', async (request,response,next) =>{
  const body = request.body

  const blog = {
    title : body.title,
    author : body.author,
    url : body.url,
    likes : body.likes
  }

  logger.info(blog)

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog.toJSON())
    
})

module.exports = blogRouter