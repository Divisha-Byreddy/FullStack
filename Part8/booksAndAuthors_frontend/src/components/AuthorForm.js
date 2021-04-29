import { useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const AuthorForm = ({authors}) => {
  const [name, setName] = useState()
  const [number, setNumber] = useState('')

  const [ updateAuthor ] = useMutation(EDIT_AUTHOR,{
      refetchQueries : [{query : ALL_AUTHORS}]
  })

  useEffect(() => {
   if(authors.length > 0) 
    setName(authors[0].name)
    
  },[authors])
  

  const submit = async (event) => {
    event.preventDefault()
    updateAuthor({ variables : {name,number}})

    setName('')
    setNumber('')
  }
  
  return(
      <div>
        <h2>Set birthyear</h2>
        <form onSubmit = {submit}>
          <select value = {name} onChange = {(event) => setName(event.target.value)}>
            {
              authors.map(author => <option key = {author.id}>{author.name}</option>)
            }
          </select>
          <div>
            born <input value = {number} onChange = {(event) => setNumber(parseInt(event.target.value))}/>
          </div>
          <button type = 'submit'>update author</button>
        </form>
      </div>
  )
}

export default AuthorForm