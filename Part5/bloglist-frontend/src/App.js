import React, { useState, useEffect, useRef } from 'react'
import loginService from './services/login'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notifications'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import _ from 'lodash'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user,setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogUser')
    if(loggedUser){
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username,password
      })
      window.localStorage.setItem('loggedBlogUser',JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }catch(exception){
      setErrorMessage({ message :'invalid username or password',color : 'red' })
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  const addBlog = async blog => {
    try{
      blogFormRef.current.toggleVisibility()
      const response = await blogService.createNew(blog)
      setBlogs(blogs.concat(response))
      setErrorMessage({ message : `a new blog ${blog.title} by ${blog.author} is added` , color : 'green' })
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }catch(exception){
      setErrorMessage({ message : 'please enter correct details' , color : 'red' })
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const incrementVote = async (id,blogToUpdate) => {
    try{
      const response = await blogService.updateBlog(id, blogToUpdate)
      setBlogs(blogs.map(x => x.id === id ?response : x))
      setErrorMessage({ message : `Incremented the likes of ${blogToUpdate.title} by one` , color : 'green' })
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }catch(exception){
      setErrorMessage({ message : `failed to update ${blogToUpdate.title} likes` , color : 'red' })
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }

  const removeBlog = async (id) => {
    try{
      await blogService.deleteBlog(id)
      setBlogs(blogs.filter(x => x.id !== id))
      console.log(blogs)
      setErrorMessage({ message : 'deletion of blog is successful' , color : 'green' })
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }catch(exception){
      setErrorMessage({ message : 'failed to delete blog' , color : 'red' })
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => {
    return(
      <LoginForm
        handleLogin = {handleLogin}
        username = {username}
        password = {password}
        handleUsernameChange = {({ target }) => setUsername(target.value)}
        handlePasswordChange = {({ target }) => setPassword(target.value)}
      />
    )
  }

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref = {blogFormRef}>
      <BlogForm
        createBlog={addBlog}
      />
    </Togglable>
  )

  const blogList = () => (
    <div>
      <p>{user.name} logged in <button onClick = {handleLogout}>logout</button></p>
      {blogForm()}
      {_.sortBy(blogs , ['likes']).reverse().map(blog =>
        <Blog key={blog.id} blog={blog} incrementVote = {incrementVote} removeBlog = {removeBlog}/>
      )}
    </div>
  )

  return (
    <div>
      <h1>Blogs</h1>
      <Notification messageInfo = {errorMessage}/>
      {user === null ? loginForm() : blogList()}
    </div>
  )
}

export default App