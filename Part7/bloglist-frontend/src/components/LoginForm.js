import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { addUser } from '../reducers/userReducer'
import { setMessage } from '../reducers/messageReducer'

const LoginForm = () => {

  const history = useHistory()
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    try{
      const user = await loginService.login({
        username,password
      })
      window.localStorage.setItem('loggedBlogUser',JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(addUser(user))
      history.push('/')
    }catch(exception){
      dispatch(setMessage({ message :'invalid username or password',color : 'danger' },5))
    }
  }

  return(

    <div>
      <h2>Login to the application</h2>
      <Form onSubmit = {handleLogin}>
        <Form.Group>
          <Form.Label>username : </Form.Label>
          <Form.Control id = 'username' type = "text" name = "username" />
          <Form.Label>password : </Form.Label>
          <Form.Control id = 'password' type = "password"  name = "password" />
          <Button variant = 'primary' id = 'login-submit' type = "submit">login</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default LoginForm