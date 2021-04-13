import React from 'react'

const LoginForm = ({ handleLogin, username, password, handleUsernameChange, handlePasswordChange }) => {
  return(

    <div>
      <h2>Login to the application</h2>
      <form onSubmit = {handleLogin}>
        <div>
        username
          <input id = 'username' type = "text" value = {username} name = "username"
            onChange = {handleUsernameChange}/>
        </div>
        <div>
         password
          <input id = 'password' type = "text" value = {password} name = "password"
            onChange = {handlePasswordChange}/>
        </div>
        <button id = 'login-submit' type = "submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm