import { useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { LOGIN } from '../queries'

const LoginForm = ({show, setToken, setPage}) =>{
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const[login,result] = useMutation(LOGIN)

  useEffect(() =>{
    if(result.data){
      const token = result.data.login.value
      setToken(token)
      setPassword('')
      setUsername('')
      setPage('authors')
      localStorage.setItem('loggedInUser',token)
    }
  },[result.data])

  if(!show){
    return null
  }

  const submit = (event) =>{
    event.preventDefault()
    localStorage.setItem('username',username)
    login({variables : {username,password}})
  }
  return(
      <div>
        <form onSubmit = {submit}>
          <div>
            username : 
            <input type = 'text' value = {username} onChange = {(event) => setUsername(event.target.value)}></input>
          </div>
          <div>
            passowrd :
            <input type = 'password' value = {password} onChange = {(event) => setPassword(event.target.value)}></input>
          </div>
          <button type = 'submit'>log in</button>
        </form>
      </div>
  )
}

export default LoginForm