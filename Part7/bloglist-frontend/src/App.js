import React, { useEffect, useRef } from 'react'
import BlogList, { Blog } from './components/Blog'
import blogService from './services/blogs'
import usersService from './services/users'
import Notification from './components/Notifications'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { setMessage } from './reducers/messageReducer'
import { createBlog, initialiseBlogs } from './reducers/blogReducer'
import { addUser } from './reducers/userReducer'
import { BrowserRouter as Router, Link,  Route, Switch } from 'react-router-dom'
import { addUsers } from './reducers/usersReducer'
import { Button, Nav, Navbar } from 'react-bootstrap'
import User, { UserList } from './components/Users'

const App = () => {

  const blogFormRef = useRef()

  const dispatch = useDispatch()
  const errorMessage = useSelector(state => state.errorMessage)
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      dispatch(initialiseBlogs(blogs))
    )
  }, [dispatch])

  useEffect(() => {
    usersService.getUsers().then(users => {
      dispatch(addUsers(users))
    })
  },[dispatch])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogUser')
    if(loggedUser){
      const user = JSON.parse(loggedUser)
      dispatch(addUser(user))
      blogService.setToken(user.token)
    }
  },[dispatch])


  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    dispatch(addUser(null))
  }

  const addBlog = async blog => {
    try{
      blogFormRef.current.toggleVisibility()
      const response = await blogService.createNew(blog)
      dispatch(createBlog(response))
      dispatch(setMessage({ message : `a new blog ${blog.title} by ${blog.author} is added` , color : 'success' },5))
    }catch(exception){
      dispatch(setMessage({ message : 'please enter correct details after logging in' , color : 'danger' },5))
    }
  }

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref = {blogFormRef}>
      <BlogForm
        createBlog={addBlog}
      />
    </Togglable>
  )

  const padding = {
    paddingRight : 10
  }

  return (
    <div className = 'container'>
      <h2>Blogs</h2>
      <Notification messageInfo = {errorMessage}/>
      <Router>
        <div>
          <Navbar collapseOnSelect expand = 'lg' bg = 'dark' variant = 'dark'>
            <Navbar.Toggle aria-controls = 'responsive-navbar-nav'/>
            <Navbar.Collapse id = 'responsive-navbar-nav'>
              <Nav className = 'mr-auto'>
                <Nav.Link href = '#' as = 'span'>
                  <Link style = {padding} to = '/'>blogs</Link>
                </Nav.Link>
                <Nav.Link href = '#' as = 'span'>
                  <Link style = {padding} to = '/users'>users</Link>
                </Nav.Link>
                <Nav.Link href = '#' as = 'span'>
                  { user ? <em>{user.username} logged in  <Button onClick = {handleLogout}>logout</Button></em>
                    : <Link style = {padding} to = '/login'>login</Link>}
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>

        <Switch>
          <Route path = '/login'>
            <LoginForm />
          </Route>
          <Route path = '/users/:id'>
            <User users = {users}/>
          </Route>
          <Route path = '/blogs/:id'>
            <Blog blogs = {blogs} />
          </Route>
          <Route path = '/users'>
            <UserList users= {users} />
          </Route>
          <Route path = '/'>
            {blogForm()}
            <BlogList blogs= {blogs} />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App