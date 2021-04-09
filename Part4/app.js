const express = require('express')
require('express-async-errors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const config = require('./utils/config')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const app = express()

const url = config.MONGODB_URI
logger.info('connecting to',url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }).then(response =>{
  logger.info('connected to mongodb')
  return response
}).catch(error =>{
  logger.error('error connection to MongoDB:', error.message)
})

app.use(express.json())
app.use(middleware.tokenExtractor)
app.use('/api/blogs',blogRouter)
app.use('/api/users',userRouter)
app.use('/api/login',loginRouter)
app.use(middleware.errorHandler)
module.exports = app 